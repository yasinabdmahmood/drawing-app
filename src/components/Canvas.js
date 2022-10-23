import { useOnDraw } from './Hooks';

function Canvas(props) {
    const {width,height} = props;

    function onDraw(ctx, point, prevPoint){
        
        drawLine(prevPoint, point, ctx, '#000000', 5)
    }

    function drawLine(start,end,ctx,color,width) {
       start = start?? end;
       ctx.beginPath();
       ctx.lineWidth = width;
       ctx.strokeStyle = color;
       ctx.moveTo(start.x, start.y);
       ctx.lineTo(end.x, end.y);
       ctx.stroke();

       ctx.fillStyle = color
       ctx.beginPath();
       ctx.arc(start.x , start.y , 2 , 0 , 2*Math.PI);
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