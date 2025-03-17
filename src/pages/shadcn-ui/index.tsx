import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { Alert, AlertDescription, AlertTitle } from 'src/components/shadcn-ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'src/components/shadcn-ui/alert-dialog';
import { Button } from 'src/components/shadcn-ui/button';

export default function ShadcnUi() {
  return (
    <>
      <ReactSeo title="shadcn/ui" />
      <CssBreadcrumbs configs={[{ label: 'shadcn/ui' }]} mb={2} />
      <div className="flex gap-2">
        <Button variant="outline">outline</Button>
        <Button variant={'destructive'}>destructive</Button>
        <Button variant={'ghost'}>ghost</Button>
        <Button variant={'secondary'}>secondary</Button>
      </div>
      <Alert className="mt-[1rem]">
        {/* <Terminal className="h-4 w-4" /> */}
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
      <AlertDialog>
        <AlertDialogTrigger className="mt-[1rem]">Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
