import { Table, Button } from "react-bootstrap";

const CounselorsPage = () => {

    return (
        <Table bordered responsive="md" style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "20%" }}>Email</th>
                <th style={{ width: "60%" }}>Courses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dhruv Iyengar</td>
                <td><Button href="mailto:iyengar.dhruv@outlook.com">Email</Button></td>
                <td>INTRO TO COMP SCI</td>
              </tr>
              <tr>
                <td>Yonatan Shasha</td>
                <td><Button href="mailto:shasha.yonatan@outlook.com">Email</Button></td>
                <td>MATH 9</td>
              </tr>
            </tbody>
          </Table>
    )

}

export default CounselorsPage