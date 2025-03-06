import { Button, Dialog, DialogContent, DialogProps, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';

export default function FlexGrowDialog(props: DialogProps) {
  const formik = useFormik<{ item: number; flexGrow: number }>({
    initialValues: { item: 0, flexGrow: -1 },
    onSubmit: (value) => {
      const element = document.getElementById(`flex-layout-item${value.item}`);
      if (element) {
        element.style.flexGrow = value.flexGrow.toString();
        if (props.onClose) props.onClose({}, 'backdropClick');
      }
    },
    validate: (value) => {
      const errors: Partial<{ item: string; flexGrow: string }> = {};
      if (!value.item) errors.item = 'Item is required';
      else if (value.item <= 0 || value.item > 6) errors.item = 'Item is in range from 1 to 6';
      if (!value.flexGrow) errors.flexGrow = 'Order is required';
      return errors;
    },
  });
  return (
    <Dialog {...props}>
      <DialogTitle>Order property</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="item"
            name="item"
            fullWidth
            placeholder="item"
            label="item"
            value={formik.values.item}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.item)}
            helperText={formik.errors.item}
          />
          <TextField
            id="flexGrow"
            name="flexGrow"
            fullWidth
            placeholder="flexGrow"
            label="flexGrow"
            value={formik.values.flexGrow}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.flexGrow)}
            helperText={formik.errors.flexGrow}
            sx={{ mt: '1rem' }}
          />
          <div className="mt-[1rem] flex justify-end">
            <Button variant="contained" size="large" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
