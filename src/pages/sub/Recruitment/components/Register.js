import { Card, Container, Grid, makeStyles } from "@material-ui/core";
import backgroundImg from "../../../../assets/images/bg-partnership.jpg";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${backgroundImg})`,
    height: "100vh",
  },
  card: {
    padding: "24px 10px 16px",
  },
  formHeader: {
    color: "red",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "700",
    paddingBottom: "20px",
    borderBottom: "1px solid gray",
  },
}));

const Register = ({ id }) => {
  const cls = useStyles();

  return (
    <div id={id} className={cls.background}>
      <Container style={{ paddingTop: "70px" }}>
        <Grid container style={{ paddingTop: "70px" }}>
          <Grid item xs={4}>
            <Card className={cls.card}>
              <div className={cls.formHeader}>
                Điền thông tin để đăng ký Tài xế ShopeeFood
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Register;
