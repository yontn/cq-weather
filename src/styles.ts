import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  card: {
    width: 345,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardBody: {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'minmax(50px, max-content) auto auto',
  },
  avatar: { width: theme.spacing(7), height: theme.spacing(7) },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  listTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  summaryDescription: {
    textTransform: 'capitalize',
  },
}));
