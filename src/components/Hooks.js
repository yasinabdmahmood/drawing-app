import { useEffect, useRef } from "react";

export function useOnDraw(onDraw) {
   
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);
    const mouseDownListenerRef = useRef(null);

    const prevPointRef = useRef(null)

    useEffect(() => {
        return () => {
            if (mouseMoveListenerRef.current) {
                //window.removeEventListener("mousemove", mouseMoveListenerRef.current);
                console.log('mousemove is removed')
            }
            if (mouseUpListenerRef.current) {
                //window.removeEventListener("mouseup", mouseUpListenerRef.current);
                console.log('mouseup is removed')
            }
         
            
        }
    },[onDraw])

    function setCanvasRef(ref) {    
        if(!ref) return;
        if(canvasRef.current){
            canvasRef.current.removeEventListener('mousedown',mouseDownListenerRef.current)
        }
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
            if(onDraw) onDraw(ctx,point,prevPointRef.current)
            prevPointRef.current=point;
            }
            
        }
        mouseMoveListenerRef.current = mouseMoveListener;
        window.addEventListener('mousemove',mouseMoveListener);
    }

    function initMouseDownListener() {
       if(!canvasRef.current) return;
       function listener() {
        isDrawingRef.current = true;
       }
       mouseDownListenerRef.current = listener;
       canvasRef.current.addEventListener('mousedown', listener)
    }

    function initMouseUpListener() {
        if(!canvasRef.current) return;
        function listener() {
         isDrawingRef.current = false;
         prevPointRef.current = null;
        }
        mouseUpListenerRef.current = listener;
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