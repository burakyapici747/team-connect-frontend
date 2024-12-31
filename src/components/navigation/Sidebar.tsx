"use client";

import { IconType } from "react-icons";
import { BiMessageSquareDots } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { MdVideoCall } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, IconButton, Tooltip, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface NavItem {
  icon: IconType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: BiMessageSquareDots,
    label: "Chat",
    href: "/chat",
  },
  {
    icon: HiUserGroup,
    label: "Teams",
    href: "/teams",
  },
  {
    icon: MdVideoCall,
    label: "Meetings",
    href: "/meetings",
  },
];

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  width: '100%',
  height: 'auto',
  aspectRatio: '1',
  borderRadius: theme.shape.borderRadius * 2,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.primary.light : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.light : theme.palette.action.hover,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  },
  position: 'relative',
  '&::before': active ? {
    content: '""',
    position: 'absolute',
    left: -8,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 4,
    height: 32,
    backgroundColor: theme.palette.primary.main,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  } : undefined,
}));

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Paper
      elevation={0}
      sx={{
        width: 72,
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.contrastText',
          }}
        >
          <BiMessageSquareDots size={24} />
        </Box>
      </Box>
      
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1,
        width: '100%',
        px: 1.5,
      }}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Tooltip
              key={item.href}
              title={item.label}
              placement="right"
              arrow
            >
              <Link href={item.href} style={{ textDecoration: 'none' }}>
                <StyledIconButton active={isActive}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 0.5,
                  }}>
                    <Icon size={20} />
                    <Box
                      component="span"
                      sx={{
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      {item.label}
                    </Box>
                  </Box>
                </StyledIconButton>
              </Link>
            </Tooltip>
          );
        })}
      </Box>
    </Paper>
  );
};

export default Sidebar; 