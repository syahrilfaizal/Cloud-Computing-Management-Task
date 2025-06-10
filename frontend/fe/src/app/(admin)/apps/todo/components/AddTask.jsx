import { useForm } from 'react-hook-form';
import { Col, Row, Button } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageMetaData from '@/components/PageTitle';
import { useSignIn } from '@/hooks/useSignIn'; // Import useSignIn hook

const AddTask = () => {
  const { control, handleSubmit } = useForm();
  const { redirectUser } = useSignIn();  // Extract redirectUser from useSignIn

  // Function to handle the form submission
  const onSubmit = async (data) => {
    console.log('Form data:', data);

    try {
      const response = await fetch('https://be-cloud-computing-management-task-production.up.railway.app/api/tasks/', {
        method: 'POST',
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

      const result = await response.json();
      console.log('Task created:', result);

      // Redirect user after successful task creation
      redirectUser(); // Redirect after task creation
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('An error occurred while creating the task.');
    }
  };

  return (
    <>
      <PageMetaData title="Tambah Tugas" />
      <Row>
        <Col md={8}>
          <ComponentContainerCard
            id="add-task-form"
            title="Form Tambah Tugas"
            description="Isi data tugas yang ingin kamu tambahkan."
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
                Simpan Tugas
              </Button>
            </form>
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  );
};

export default AddTask;
