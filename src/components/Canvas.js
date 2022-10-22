import React from 'react';
import { useOnDraw } from './Hooks';

function Canvas(props) {
    const {width,height} = props;

    function onDraw(ctx, point){
        ctx.fillStyle = '#000000'
        ctx.beginPath();
        ctx.arc(point.x , point.y , 2 , 0 , 2*Math.PI);
        ctx.fill()
    }

    const setCanvasRef = useOnDraw(onDraw);



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