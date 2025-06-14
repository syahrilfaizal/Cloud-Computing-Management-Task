import { useForm } from 'react-hook-form';
import { Col, Row, Button } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageMetaData from '@/components/PageTitle';

const EditTask = () => {
  // Simulasi data awal tugas yang diedit
  const defaultValues = {
    taskName: 'Tugas 1',
    createdDate: '2025-06-01',
    dueDate: '2025-06-10',
    assignee: 'Budi',
    status: 'Dalam Proses',
    priority: 'Tinggi',
    description: 'Ini deskripsi dari tugas 1.',
  };

  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log('Updated task data:', data);
  };

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
