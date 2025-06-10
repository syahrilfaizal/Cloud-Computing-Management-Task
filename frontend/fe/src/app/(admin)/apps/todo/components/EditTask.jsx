import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Col, Row, Button } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageMetaData from '@/components/PageTitle';

const EditTask = () => {
  const { id } = useParams(); // Ambil ID task dari URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);  // Menambahkan loading state
  const [error, setError] = useState(null); // Menambahkan state error
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // Ambil data task berdasarkan ID
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://be-cloud-computing-management-task-production.up.railway.app/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTask(data);

        // Set form values setelah data task diambil dan pastikan format tanggal sesuai
        const formattedCreatedDate = data.created_at.split("T")[0]; // Menyaring tanggal dalam format YYYY-MM-DD
        const formattedDueDate = data.due_date.split("T")[0]; // Menyaring tanggal dalam format YYYY-MM-DD

        setValue("taskName", data.task_name);
        setValue("createdDate", formattedCreatedDate);
        setValue("dueDate", formattedDueDate);
        setValue("assignee", data.assignee_name);
        setValue("status", data.status);
        setValue("priority", data.priority);
        setValue("description", data.description);
      } catch (error) {
        setError("Error fetching task. Please try again.");
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://be-cloud-computing-management-task-production.up.railway.app/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          task_name: data.taskName,
          created_at: data.createdDate,
          due_date: data.dueDate,
          assignee_name: data.assignee,
          status: data.status,
          priority: data.priority,
          description: data.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Redirect to the task list or show a success message
      navigate("/apps/todolist"); // Redirect to the task list page after successful update
    } catch (error) {
      console.error('Error updating task:', error);
      alert('An error occurred while updating the task.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Menunggu data task diambil
  }

  if (error) {
    return <div>{error}</div>; // Menampilkan error jika terjadi masalah
  }

  if (!task) {
    return <div>Task not found</div>;  // Jika task tidak ditemukan
  }

  return (
    <>
      <PageMetaData title="Edit Tugas" />
      <Row>
        <Col md={8}>
          <ComponentContainerCard
            id="edit-task-form"
            title="Form Edit Tugas"
            description="Perbarui data tugas sesuai kebutuhan."
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextFormInput
                name="taskName"
                label="Nama Tugas"
                control={control}
                containerClassName="mb-3"
              />

              <TextFormInput
                name="createdDate"
                label="Tanggal Dibuat"
                type="date"
                control={control}
                containerClassName="mb-3"
              />

              <TextFormInput
                name="dueDate"
                label="Tanggal Jatuh Tempo"
                type="date"
                control={control}
                containerClassName="mb-3"
              />

              <TextFormInput
                name="assignee"
                label="Ditugaskan Kepada"
                control={control}
                placeholder="Nama orang"
                containerClassName="mb-3"
              />

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" {...control.register('status')}>
                  <option value="Tertunda">Tertunda</option>
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Prioritas</label>
                <select className="form-select" {...control.register('priority')}>
                  <option value="Rendah">Rendah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Tinggi">Tinggi</option>
                </select>
              </div>

              <TextAreaFormInput
                name="description"
                label="Deskripsi"
                control={control}
                rows={5}
              />

              <Button type="submit" variant="primary">
                Update Tugas
              </Button>
            </form>
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  );
};

export default EditTask;
