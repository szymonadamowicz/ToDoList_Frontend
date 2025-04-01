import { useContext, useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableTask from "./Task";
import { TaskContext } from "../App";
import { useTranslation } from "react-i18next";
import { TaskViewProps } from "../types/Types";

const TaskView: React.FC<TaskViewProps> = ({ isCompletedPage }) => {
  const { tasks, swapTasks, isLoading, isError } = useContext(TaskContext)!;
  const [localTasks, setLocalTasks] = useState(tasks);
  const { t }: any = useTranslation();

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const filteredTasks = localTasks.filter((item) =>
    isCompletedPage ? item.isHidden : !item.isHidden
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedId = Number(active.id);
    const targetId = Number(over.id);

    const fromIndex = localTasks.findIndex((t) => t.id === draggedId);
    const toIndex = localTasks.findIndex((t) => t.id === targetId);

    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

    const updated = [...localTasks];
    const [movedTask] = updated.splice(fromIndex, 1);

    updated.splice(toIndex, 0, movedTask);

    setLocalTasks(updated);
    swapTasks(draggedId, targetId);
  };

  return (
    <div className="grid grid-cols-4 gap-[35px] m-5 mt-5 p-5">
      {isLoading && tasks.length === 0 && (
        <div className="text-gray-800 dark:text-white">
          {t("fetching data...")}
        </div>
      )}

      {isError && (
        <div className="text-red-500">{t("error fetching data")}</div>
      )}

      {filteredTasks.length === 0 && !isLoading && (
        <div className="text-gray-500 dark:text-gray-300 italic">
          {t("No tasks available")}
        </div>
      )}

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={localTasks.map((task) => task.id)}
          strategy={localTasks.length > 4 ? verticalListSortingStrategy : rectSortingStrategy} 
        >
          {filteredTasks.map((task) => (
            <DraggableTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskView;
