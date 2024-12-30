"use client";

import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography } from "@mui/material";
import { Download as DownloadIcon, InsertDriveFile as FileIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { useState } from "react";

interface FileListProps {
  chatId: string;
}

// Mock data for files
const MOCK_FILES = [
  {
    id: "1",
    name: "Project Presentation.pdf",
    size: "2.5 MB",
    uploadedAt: new Date(2024, 0, 1, 10, 30),
    type: "pdf",
    sender: "John Doe",
  },
  {
    id: "2",
    name: "Meeting Notes.docx",
    size: "500 KB",
    uploadedAt: new Date(2024, 0, 1, 11, 15),
    type: "docx",
    sender: "Jane Smith",
  },
  {
    id: "3",
    name: "Budget Report.xlsx",
    size: "1.2 MB",
    uploadedAt: new Date(2024, 0, 1, 14, 20),
    type: "xlsx",
    sender: "John Doe",
  },
];

const FileList = ({ chatId }: FileListProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(MOCK_FILES.map(file => file.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
      {selected.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2,
          p: 1,
          bgcolor: 'primary.light',
          borderRadius: 1,
        }}>
          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
            {selected.length} {selected.length === 1 ? 'file' : 'files'} selected
          </Typography>
          <IconButton 
            color="primary"
            onClick={() => console.log('Downloading:', selected)}
          >
            <DownloadIcon />
          </IconButton>
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < MOCK_FILES.length}
                  checked={selected.length === MOCK_FILES.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_FILES.map((file) => {
              const isItemSelected = isSelected(file.id);
              return (
                <TableRow
                  hover
                  key={file.id}
                  selected={isItemSelected}
                  sx={{ 
                    cursor: 'pointer',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                    },
                  }}
                  onClick={() => handleSelect(file.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FileIcon sx={{ color: 'primary.main' }} />
                      {file.name}
                    </Box>
                  </TableCell>
                  <TableCell>{file.sender}</TableCell>
                  <TableCell>{format(file.uploadedAt, "MMM d, yyyy")}</TableCell>
                  <TableCell align="right">{file.size}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FileList; 