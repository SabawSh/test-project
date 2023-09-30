export interface ILabelData {
    id: string;
    shape: IShape;
    text: IText;
    content: IContent;
    action: null;
    animation: null;
    type: '[Hmi] update dynamic label'
}
export interface IShape {
    elementId?: string;
    shape: 'circle' | 'rect';
    view: {
        fill: string;
        width: number;
        height: number;
    }
}

export interface IText {
    elementId?: string;
    view: {
        fontSize: number;
        fill: string;
        x: number;
        y: number;
    }
}

export interface IContent {
    label: string;
    dynamic: {
        topic: string;
        output: string;
        isLinked: boolean;
    }
}

export interface ILabelConfig {
    label: string;
    color: string;
    fontSize: number;
    fill: string;
    width: number;
    height: number;
}