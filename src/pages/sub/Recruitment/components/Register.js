import {
  Card,
  Container,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import backgroundImg from "../../../../assets/images/bg-partnership.jpg";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${backgroundImg})`,
    minHeight: "100vh",
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
  formControl: {
    width: "100%",
  },
  textField: {
    width: "100%",
  },
  text: {
    color: "white",
  },
}));

const Register = () => {
  const cls = useStyles();
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={cls.background}>
      <Container style={{ paddingTop: "70px" }}>
        <Grid container spacing={4} style={{ paddingTop: "70px" }}>
          <Grid item xs={4}>
            <Card className={cls.card}>
              <div className={cls.formHeader}>
                Điền thông tin để đăng ký Tài xế ShopeeFood
              </div>
              <Grid>
                <FormControl variant="filled" className={cls.formControl}>
                  <InputLabel>Age</InputLabel>
                  <Select value={age} onChange={handleChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <TextField
                label="Filled"
                variant="filled"
                className={cls.textField}
              />
              <TextField
                label="Filled"
                variant="filled"
                className={cls.textField}
              />
              <TextField
                label="Filled"
                variant="filled"
                className={cls.textField}
              />
              <TextField
                label="Filled"
                variant="filled"
                className={cls.textField}
              />
              <TextField
                label="Filled"
                variant="filled"
                className={cls.textField}
              />
              <Grid>
                <FormControl variant="filled" className={cls.formControl}>
                  <InputLabel>Age</InputLabel>
                  <Select value={age} onChange={handleChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <TextField
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                className={cls.textField}
              />
              <Typography>
                Khi tiếp tục, tôi đồng ý rằng ShopeeFood có thể thu thập và sử
                dụng thông tin được tôi cung cấp.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" className={cls.text}>
              Trở thành Tài xế ShopeeFood để
            </Typography>
            <Typography variant="h5" className={cls.text}>
              TỰ CHỦ THỜI GIAN - GIA TĂNG THU NHẬP
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Register;
