import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StorageIcon from '@mui/icons-material/Storage';
import HelpIcon from '@mui/icons-material/Help';

interface SidebarData {
    label: string
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
    link: string
}

export const sidebarData: SidebarData[] = [
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
        label: 'Datos',
        icon: StorageIcon,
        link: '/data'
    },
    {
        label: 'Ayuda',
        icon: HelpIcon,
        link: '/home'
    },
]