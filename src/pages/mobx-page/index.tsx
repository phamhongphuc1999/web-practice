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
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { MobXRootType } from 'src/mobx-store';
import { timerStore } from 'src/mobx-store/Timer';
import { todoStore } from 'src/mobx-store/Todo';

const MobXPageLayout = observer(({ timer, todo }: MobXRootType) => {
  return (
    <>
      <ReactSeo title="MobX" />
      <CssBreadcrumbs configs={[{ label: 'MobX' }]} mb={2} />
      <p>{`Seconds passed: ${timer.secondsPassed}`}</p>
      <div className="flex items-center gap-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => todo.loadTodo()}
          sx={{ mt: '1rem' }}
        >
          Load todo list
        </Button>
        {todo.status == 'pending' && <CircularProgress sx={{ fontSize: '16px' }} />}
      </div>
      <TableContainer sx={{ mt: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Create at</TableCell>
              <TableCell>Update at</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(todo.todos).map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{moment(item.createAt).format('DD-MMM-YYYY, hh:mm:ss')}</TableCell>
                  <TableCell>{moment(item.updateAt).format('DD-MMM-YYYY, hh:mm:ss')}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default function MobXPage() {
  return <MobXPageLayout timer={timerStore} todo={todoStore} />;
}
