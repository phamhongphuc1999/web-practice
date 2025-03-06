import { Button, Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material';

export default function DirectionDialog(props: DialogProps) {
  function onClick(direction: string) {
    const element = document.getElementById('flex-layout-container');
    if (element) {
      element.style.flexDirection = direction;
      if (props.onClose) props.onClose({}, 'backdropClick');
    }
  }
  return (
    <Dialog {...props}>
      <DialogTitle>Direction property</DialogTitle>
      <DialogContent>
        <Button onClick={() => onClick('row')}>row</Button>
        <Button onClick={() => onClick('row-reverse')}>revert row</Button>
        <Button onClick={() => onClick('column')}>column</Button>
        <Button onClick={() => onClick('column-reverse')}>revert column</Button>
      </DialogContent>
    </Dialog>
  );
}
