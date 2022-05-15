import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./bar-node.module.css";
import { paddingTop } from '../../gantt/gantt'
import dayjs from "dayjs";

export const BarNode: React.FC<TaskItemProps> = ({
  task,
  boxHeight = 0,
  isDateChangeable,
  onEventStart,
  handleNodeChange,
  isSelected,
}) => {
  // const transform = `rotate(45 ${task.x1 + task.height * 0.356}
  //   ${task.y + task.height * 0.85})`;
  const { height = 0 } = task;
  const getBarColor = () => {
    return isSelected
      ? task.styles.backgroundSelectedColor
      : task.styles.backgroundColor;
  };

  const linex = task.x1;
  const fill = task.styles?.textColor || '#000';
  return (
    <g tabIndex={0} className={styles.milestoneWrapper}>
      <g>
        <text y={0} x={linex - height / 2} fill={fill}>{task.name}</text>
        <text y={20} x={linex - height / 2} fill={fill} style={{
          transform: `translateX(-17px)`
        }}>{dayjs(task.end).format('YYYY/MM/DD')}</text>
      </g>
      <line x1={linex} y1={height} x2={linex} y2={boxHeight + paddingTop} stroke={getBarColor()} strokeDasharray="5,3,9,2"></line>
      <rect
        fill={getBarColor()}
        style={{ cursor: 'pointer' }}
        x={linex - height / 2}
        width={height}
        y={25}
        onClick={(e) => {
          handleNodeChange?.(task, e);
        }}
        height={height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        // transform={transform}
        className={styles.milestoneBackground}
        onMouseDown={e => {
          return false;
          isDateChangeable && onEventStart("move", task, e);
        }}
      />

      {/* <text

        >
          {task.name}
        </text> */}
    </g>
  );
};
