import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useMemo, useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { MobXRootType } from 'src/mobx-store';
import { timerStore } from 'src/mobx-store/Timer';
import { TodoItemType, todoStore } from 'src/mobx-store/Todo';
import AddItemDialog from './AddItemDialog';
import DeleteDialog from './DeleteDialog';
import EditItemDialog from './EditItemDialog';

function TodoList({ todo }: { todo: MobXRootType['todo'] }) {
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<TodoItemType | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string>('');

  const todos = todo.todos;

  return (
    <>
      <div className="mt-[1rem] flex items-center gap-4">
        <Button variant="outlined" color="primary" onClick={() => todo.loadTodo()}>
          Load todo list
        </Button>
        <Button variant="contained" color="error" onClick={() => setAddOpen(true)}>
          Add a new item
        </Button>
        {todo.status == 'pending' && <CircularProgress size={20} />}
      </div>
      {useMemo(() => {
        return (
          <TableContainer sx={{ mt: '1rem' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Create at</TableCell>
                  <TableCell>Update at</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Features</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(todos).map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{moment(item.createAt).format('DD-MMM-YYYY, hh:mm:ss')}</TableCell>
                      <TableCell>{moment(item.updateAt).format('DD-MMM-YYYY, hh:mm:ss')}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="outlined" size="large" onClick={() => setEditItem(item)}>
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => setDeleteId(item.id)}
                          sx={{ ml: '0.5rem' }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }, [todos])}
      {editItem && (
        <EditItemDialog
          open={Boolean(editItem)}
          onClose={() => setEditItem(undefined)}
          todo={todo}
          item={editItem}
        />
      )}
      <AddItemDialog open={addOpen} onClose={() => setAddOpen(false)} todo={todo} />
      <DeleteDialog
        open={Boolean(deleteId)}
        deleteId={deleteId}
        onClose={() => setDeleteId('')}
        todo={todo}
      />
    </>
  );
}

const MobXPageLayout = observer(({ timer, todo }: MobXRootType) => {
  return (
    <>
      <ReactSeo title="MobX" />
      <CssBreadcrumbs configs={[{ label: 'MobX' }]} mb={2} />
      <p>{`Seconds passed: ${timer.secondsPassed}`}</p>
      <TodoList todo={todo} />
    </>
  );
});

export default function MobXPage() {
  return <MobXPageLayout timer={timerStore} todo={todoStore} />;
}
