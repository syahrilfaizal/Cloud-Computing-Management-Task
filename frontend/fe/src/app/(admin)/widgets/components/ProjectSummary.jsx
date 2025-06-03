import { Card, CardBody, CardTitle, ProgressBar } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllProjects } from '@/helpers/data';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProjectSummary = () => {
  const [projectData, setProjectData] = useState();
  useEffect(() => {
    ;
    (async () => {
      const data = await getAllProjects();
      setProjectData(data);
    })();
  }, []);
  return <Card>
      <CardBody className="p-0">
        <div className="pt-3 px-3">
          <div className="float-end">
            <Link to="" className="text-primary icon-center">
              Export&nbsp;
              <IconifyIcon icon="bx:export" className="ms-1" />
            </Link>
          </div>
          <CardTitle as={'h5'} className="mb-3">
            Recent Project Summary
          </CardTitle>
        </div>
        <SimplebarReactClient className="mb-3" data-simplebar style={{
        maxHeight: 324
      }}>
          <div className="table-responsive table-centered table-nowrap px-3">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Team</th>
                  <th>Deadline</th>
                  <th>Work Progress</th>
                </tr>
              </thead>
              <tbody>
                {projectData && projectData.map((project, idx) => <tr key={idx}>
                      <td>{project.projectName}</td>
                      <td>{project.client}</td>
                      <td className="avatar-group">
                        {project.teamMembers.map((member, idx) => <Link to="" key={idx} className="avatar-group-item">
                            <img src={member} alt="avatar-2" className="img-fluid avatar-xs rounded-circle avatar-border" />
                          </Link>)}
                      </td>
                      <td>{new Date(project.deadlineDate).toDateString()}</td>
                      <td>
                        <ProgressBar variant={project.variant} now={project.progressValue} className="progress-sm" />
                      </td>
                    </tr>)}
              </tbody>
            </table>
          </div>
        </SimplebarReactClient>
      </CardBody>
    </Card>;
};
export default ProjectSummary;