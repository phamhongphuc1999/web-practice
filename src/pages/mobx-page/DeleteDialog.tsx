import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogProps, DialogTitle, IconButton } from '@mui/material';
import { MobxTodoStoreType } from 'src/mobx-store/Todo';

interface Props extends DialogProps {
  deleteId: string;
  todo: MobxTodoStoreType['todo'];
}

export default function DeleteDialog({ deleteId, todo, ...props }: Props) {
  function onClose() {
    if (props.onClose) props.onClose({}, 'backdropClick');
  }

  return (
    <Dialog {...props}>
      <DialogTitle className="flex w-full items-center justify-between bg-[red]">
        <p>Delete item</p>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <p>Are you sure want to delete item with id {deleteId}</p>
        <div className="mt-[1rem] flex justify-end gap-[1rem]">
          <Button variant="outlined" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              todo.deleteTodo(deleteId);
              onClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
