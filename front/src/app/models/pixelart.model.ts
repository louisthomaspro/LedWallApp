export class Pixelart {
    _id: string;
    modelVersion: string;
    base64Thumb: string;
    isGif: boolean;
    piskel: {
        name: string;
        description: string;
        fps: number;
        height: number;
        width: number;
        layers: [string];
    };
}
