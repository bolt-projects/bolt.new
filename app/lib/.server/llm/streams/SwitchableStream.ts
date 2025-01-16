interface StreamController {
  enqueue(chunk: unknown): void;
  error(error: unknown): void;
  terminate(): void;
}

export class SwitchableStream extends TransformStream {
  private controller: StreamController | null = null;
  private currentReader: ReadableStreamDefaultReader | null = null;
  private switchCount = 0;

  constructor() {
    let controllerRef: TransformStreamDefaultController | undefined;

    super({
      start(controller) {
        controllerRef = controller;
      },
    });

    if (!controllerRef) {
      throw new Error('Stream controller initialization failed');
    }

    this.controller = controllerRef;
  }

  async switchSource(newStream: ReadableStream): Promise<void> {
    try {
      if (this.currentReader) {
        await this.currentReader.cancel();
      }

      this.currentReader = newStream.getReader();
      await this.pumpStream();
      this.switchCount++;
    } catch (error) {
      console.error('Error switching stream source:', error);
      throw error;
    }
  }

  private async pumpStream(): Promise<void> {
    if (!this.currentReader || !this.controller) {
      throw new Error('Stream is not properly initialized');
    }

    try {
      while (true) {
        const { done, value } = await this.currentReader.read();

        if (done) {
          break;
        }

        this.controller.enqueue(value);
      }
    } catch (error) {
      console.error('Error pumping stream:', error);
      this.controller.error(error);
      throw error;
    }
  }

  close(): void {
    try {
      if (this.currentReader) {
        this.currentReader.cancel();
      }

      this.controller?.terminate();
    } catch (error) {
      console.error('Error closing stream:', error);
      throw error;
    }
  }

  get switches(): number {
    return this.switchCount;
  }
} 