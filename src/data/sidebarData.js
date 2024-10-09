import HomeIcon from '@mui/icons-material/Home';
import CommuteIcon from '@mui/icons-material/Commute';
import TimelineIcon from '@mui/icons-material/Timeline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StorageIcon from '@mui/icons-material/Storage';
import HelpIcon from '@mui/icons-material/Help';


export const sidebarData = [
    {
        label: 'Página principal',
        icon: HomeIcon,
        link: '/home'
    },
    {
        label: 'Visualización',
        icon: VisibilityIcon,
        link: '/view'
    },
    {
        label: 'Lista de servicios',
        icon: CommuteIcon,
        link: '/services'
    },
    {
        label: 'Lista de líneas',
        icon: TimelineIcon,
        link: '/lines'
    },
    {
        label: 'Ayuda',
        icon: HelpIcon,
        link: '/home'
    },
]
