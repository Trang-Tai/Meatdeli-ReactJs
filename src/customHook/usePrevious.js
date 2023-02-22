import { useEffect, useRef } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
        console.log(ref.current)
    });
    return ref.current;
}

export default usePrevious;