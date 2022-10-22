import React from 'react';
import { useOnDraw } from './Hooks';

function Canvas(props) {
    const {width,height} = props;

    const setCanvasRef = useOnDraw();

    return (
        <div>
            <canvas
                width={width}
                height={height}
                style={canvasStyle}
                ref={setCanvasRef}
            />
        </div>
    );
}

const canvasStyle = {
    border: '1px solid black',
}

export default Canvas;