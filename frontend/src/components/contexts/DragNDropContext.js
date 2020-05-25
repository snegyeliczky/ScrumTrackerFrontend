import React, {createContext, useRef} from "react";

export const DragAndDropContext = createContext();

export const DragNDropProvider = props => {

    const dragItem = useRef(); //dragged task id and status id where it come from
    const dragNodeItem = useRef(); // dragged html element

    return (
        <DragAndDropContext.Provider
        value={{dragItem,dragNodeItem}}
        >

        </DragAndDropContext.Provider>
    );
};
