import React, { useRef, useEffect } from "react";
import { GridProps, Grid } from "../grid/grid";
import { CalendarProps, Calendar } from "../calendar/calendar";
import { TaskGanttContentProps, TaskGanttContent, TaskGanttContentNode } from "./task-gantt-content";
import styles from "./gantt.module.css";
import { paddingTop } from './gantt';

export type TaskGanttProps = {
  gridProps: GridProps;
  calendarProps: CalendarProps;
  barProps: TaskGanttContentProps;
  ganttHeight: number;
  scrollY: number;
  scrollX: number;
};
export const TaskGantt: React.FC<TaskGanttProps> = ({
  gridProps,
  calendarProps,
  barProps,
  ganttHeight,
  scrollY,
  scrollX,
}) => {
  const ganttSVGRef = useRef<SVGSVGElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const verticalGanttContainerRef = useRef<HTMLDivElement>(null);
  const newBarProps = { ...barProps, svg: ganttSVGRef };

  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  useEffect(() => {
    if (verticalGanttContainerRef.current) {
      verticalGanttContainerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  return (
    <div
      className={styles.ganttVerticalContainer}
      ref={verticalGanttContainerRef}
      dir="ltr"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={gridProps.svgWidth}
        height={1}
        fontFamily={barProps.fontFamily}
        style={{ overflow: 'overlay', position: 'absolute' }}
      >
        <TaskGanttContentNode   {...newBarProps} boxHeight={barProps.rowHeight * barProps.tasks.length + calendarProps.headerHeight} />
      </svg>
      <div style={{ paddingTop: paddingTop }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={calendarProps.headerHeight}
          fontFamily={barProps.fontFamily}
        >
          <Calendar {...calendarProps} />
        </svg>
        <div
          ref={horizontalContainerRef}
          className={styles.horizontalContainer}
          style={
            ganttHeight
              ? { height: ganttHeight, width: gridProps.svgWidth }
              : { width: gridProps.svgWidth }
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={gridProps.svgWidth}
            height={barProps.rowHeight * barProps.tasks.length}
            fontFamily={barProps.fontFamily}
            style={{ overflow: 'overlay' }}
            ref={ganttSVGRef}
          >
            <Grid  {...gridProps} boxHeight={barProps.rowHeight * barProps.tasks.length + calendarProps.headerHeight} />
            <TaskGanttContent {...newBarProps} />
          </svg>
        </div>

      </div>

    </div>
  );
};
