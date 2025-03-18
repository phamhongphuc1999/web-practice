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
import { MobxTodoStoreType, TodoItemType } from 'src/mobx-store/Todo';

interface Props extends DialogProps {
  item: TodoItemType;
  todo: MobxTodoStoreType['todo'];
}

export default function EditItemDialog({ todo, item, ...props }: Props) {
  function validate(value: TodoItemType) {
    const errors: Partial<{ title: string; quantity: string }> = {};
    if (!value.title) errors.title = 'Title is required';
    if (!value.quantity) errors.quantity = 'Quantity is required';
    else if (value.quantity <= 0) errors.quantity = 'Quantity must be greater than 0';
    return errors;
  }

  const formik = useFormik<TodoItemType>({
    initialValues: item,
    onSubmit: (value, formikHelpers) => {
      todo.editTodo(value);
      if (props.onClose) props.onClose({}, 'backdropClick');
      formikHelpers.resetForm();
    },
    validate,
  });

  return (
    <Dialog {...props} fullWidth maxWidth="xs">
      <DialogTitle className="flex w-full items-center justify-between bg-[red]">
        <p>Edit item</p>
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
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
