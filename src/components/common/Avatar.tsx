"use client";

import { Avatar as MuiAvatar, Badge, styled } from '@mui/material';
import { getInitials, getAvatarColor } from "@/utils/getInitials";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  isOnline?: boolean;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '& .MuiBadge-invisible': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const Avatar = ({ name, size = "md", showStatus, isOnline }: AvatarProps) => {
  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);
  
  const sizeMap = {
    sm: { width: 32, height: 32, fontSize: 14 },
    md: { width: 40, height: 40, fontSize: 16 },
    lg: { width: 48, height: 48, fontSize: 18 },
  };

  const AvatarComponent = (
    <MuiAvatar
      sx={{
        ...sizeMap[size],
        bgcolor: bgColor,
        fontWeight: 500,
      }}
    >
      {initials}
    </MuiAvatar>
  );

  if (showStatus) {
    return (
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        invisible={!isOnline}
      >
        {AvatarComponent}
      </StyledBadge>
    );
  }

  return AvatarComponent;
};

export default Avatar; 