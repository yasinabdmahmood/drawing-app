import { useRef } from "react";

export function useOnDraw(onDraw) {
   
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);

    function setCanvasRef(ref) {
        if(!ref) return;
        canvasRef.current = ref
        initMouseMoveListener()
        initMouseDownListener()
        initMouseUpListener()
    }

    function initMouseMoveListener() {
        const mouseMoveListener = (e) => {
            if(isDrawingRef.current){
            const point = computePointInCanvas(e.clientX, e.clientY)
            const ctx = canvasRef.current.getContext('2d')
            if(onDraw) onDraw(ctx,point)
            console.log(point)
            }
            
        }
        window.addEventListener('mousemove',mouseMoveListener)
    }

    function initMouseDownListener() {
       if(!canvasRef.current) return;
       function listener() {
        isDrawingRef.current = true;
       }
       canvasRef.current.addEventListener('mousedown', listener)
    }

    function initMouseUpListener() {
        if(!canvasRef.current) return;
        function listener() {
         isDrawingRef.current = false;
        }
        window.addEventListener('mouseup', listener)
     }

    function computePointInCanvas(clientX,clientY) {
       const boundingRect = canvasRef.current.getBoundingClientRect();
       if(canvasRef){
        return {
            x : clientX - boundingRect.left,
            y : clientY - boundingRect.top,
       }
       }
       else{
        return null
       }
       
    }

    return setCanvasRef;
}