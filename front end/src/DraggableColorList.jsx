// DraggableColorList.jsx
import React, { Component } from "react";
import DraggableColorBox from "./DraggableColorBox";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

export default class DraggableColorList extends Component {
  constructor(props) {
    super(props);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = this.props.colors.findIndex(c => c.name === active.id);
      const newIndex = this.props.colors.findIndex(c => c.name === over.id);

      this.props.onSortEnd(arrayMove(this.props.colors, oldIndex, newIndex));
    }
  }

  render() {
    const { colors, removeColor } = this.props;

    return (
      <DndContext collisionDetection={closestCenter} onDragEnd={this.handleDragEnd}>
        <SortableContext
          items={colors.map(c => c.name)}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ height: "100%", display: "flex", flexWrap: "wrap" }}>

            {colors.map((color) => (
              <DraggableColorBox
                key={color.name}
                name={color.name}
                color={color.color}
                handleClick={() => removeColor(color.name)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }
}
