import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { CoreTodoItemType, MobxTodoStoreType } from 'src/mobx-store/Todo';

interface Props extends DialogProps {
  todo: MobxTodoStoreType['todo'];
}

export default function AddItemDialog({ todo, ...props }: Props) {
  function validate(value: CoreTodoItemType) {
    const errors: Partial<{ title: string; quantity: string }> = {};
    if (!value.title) errors.title = 'Title is required';
    if (!value.quantity) errors.quantity = 'Quantity is required';
    else if (value.quantity <= 0) errors.quantity = 'Quantity must be greater than 0';
    return errors;
  }

  const formik = useFormik<CoreTodoItemType>({
    initialValues: { title: '', quantity: 0 },
    onSubmit: (value) => {
      todo.addNewTodo(value);
      if (props.onClose) props.onClose({}, 'backdropClick');
    },
    validate,
  });

  return (
    <Dialog {...props} fullWidth maxWidth="xs">
      <DialogTitle className="flex w-full items-center justify-between bg-[red]">
        <p>Add new item</p>
        <IconButton
          onClick={(event) => {
            if (props.onClose) props.onClose(event, 'backdropClick');
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="title"
            name="title"
            fullWidth
            placeholder="title"
            label="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.title)}
            helperText={formik.errors.title}
          />
          <TextField
            id="quantity"
            name="quantity"
            type="number"
            fullWidth
            placeholder="quantity"
            label="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.quantity)}
            helperText={formik.errors.quantity}
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
