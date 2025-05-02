import { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', description: 'Description 1', status: 'Pending' },
    { id: 2, name: 'Task 2', description: 'Description 2', status: 'Completed' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    name: '',
    description: '',
    status: 'Pending'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? currentTask : task
      ));
    } else {
      const newTask = {
        ...currentTask,
        id: tasks.length + 1
      };
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setCurrentTask({ name: '', description: '', status: 'Pending' });
    setIsEditing(false);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tasks Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Task
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  onClick={() => handleEdit(task)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Task' : 'Add New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentTask.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={currentTask.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tasks;