import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./bar-node.module.css";
import { paddingTop } from '../../gantt/gantt'

export const BarNode: React.FC<TaskItemProps> = ({
  task,
  boxHeight = 0,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  console.log(task, 'task');
  // const transform = `rotate(45 ${task.x1 + task.height * 0.356}
  //   ${task.y + task.height * 0.85})`;
  const getBarColor = () => {
    return isSelected
      ? task.styles.backgroundSelectedColor
      : task.styles.backgroundColor;
  };

  const linex = task.x1 + task.height / 2;

  return (
    <g tabIndex={0} className={styles.milestoneWrapper}>
      <rect
        fill={getBarColor()}
        x={task.x1}
        width={task.height}
        y={0}
        height={task.height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        // transform={transform}
        className={styles.milestoneBackground}
        onMouseDown={e => {
          return false;
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
      <line x1={linex} y1={task.height} x2={linex} y2={boxHeight + paddingTop} stroke={getBarColor()} strokeDasharray="5,3,9,2"></line>
      {/* <text

        >
          {task.name}
        </text> */}
    </g>
  );
};
