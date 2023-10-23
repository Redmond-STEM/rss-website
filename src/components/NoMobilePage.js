import { Card, CardBody, CardHeader } from "react-bootstrap";

const NoMobilePage = () => {

    return (
        <div className="no-mobile-page">
            <Card>
                <CardHeader>No Mobile Devices Allowed</CardHeader>
                <CardBody>Please use a desktop or tablet device to access this content.</CardBody>
            </Card>
        </div>
    );

}

export default NoMobilePage;