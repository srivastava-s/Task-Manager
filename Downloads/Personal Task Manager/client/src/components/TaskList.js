const sampleTasks = [
  {
    id: 1,
    title: 'Finish React Project',
    description: 'Complete the frontend and backend integration.',
    dueDate: '2025-07-05',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Read Documentation',
    description: 'Go through the API docs for new features.',
    dueDate: '2025-07-10',
    priority: 'medium',
    status: 'completed',
  },
];

const TaskList = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-2 text-blue-600">Your Tasks</h2>
    {sampleTasks.map((task) => (
      <div
        key={task.id}
        className={`rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center justify-between bg-white border-l-4 ${
          task.priority === 'high'
            ? 'border-red-500'
            : task.priority === 'medium'
            ? 'border-yellow-500'
            : 'border-green-500'
        }`}
      >
        <div>
          <h3 className="font-bold text-lg mb-1">{task.title}</h3>
          <p className="text-gray-600 mb-1">{task.description}</p>
          <div className="text-sm text-gray-400">Due: {task.dueDate}</div>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded transition">Edit</button>
          <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded transition">Delete</button>
        </div>
      </div>
    ))}
  </div>
);

export default TaskList; 