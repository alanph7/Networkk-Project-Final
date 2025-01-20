
import React, { useState } from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  PendingActions as PendingIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// Dummy data for gig requests
const dummyGigRequests = [
  {
    id: 1,
    title: "WordPress Website Development",
    seller: "John Doe",
    category: "Web Development",
    price: 50,
    description: "I will create a custom WordPress website with responsive design",
    status: "pending",
    submittedAt: "2025-01-19T10:30:00",
  },
  {
    id: 2,
    title: "Logo Design Package",
    seller: "Jane Smith",
    category: "Graphics Design",
    price: 35,
    description: "Professional logo design with unlimited revisions",
    status: "approved",
    submittedAt: "2025-01-18T15:45:00",
  },
  {
    id: 3,
    title: "Social Media Management",
    seller: "Mike Johnson",
    category: "Digital Marketing",
    price: 75,
    description: "Complete social media management for your business",
    status: "rejected",
    submittedAt: "2025-01-17T09:15:00",
  },
  {
    id: 4,
    title: "Mobile App Development",
    seller: "Sarah Williams",
    category: "App Development",
    price: 120,
    description: "Native iOS and Android app development",
    status: "pending",
    submittedAt: "2025-01-20T08:00:00",
  },
  {
    id: 5,
    title: "Content Writing Services",
    seller: "Alex Brown",
    category: "Writing & Translation",
    price: 25,
    description: "SEO-optimized content writing for your website",
    status: "approved",
    submittedAt: "2025-01-19T14:20:00",
  }
];

const categories = [
  "Web Development",
  "App Development",
  "Graphics Design",
  "Digital Marketing",
  "Writing & Translation"
];

const GigRequestCard = ({ gig, onStatusChange }) => {
  const statusColors = {
    pending: "warning",
    approved: "success",
    rejected: "error"
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h3">
              {gig.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {gig.seller}
            </Typography>
          </Box>
          <Chip
            label={gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
            color={statusColors[gig.status]}
            size="small"
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Category
            </Typography>
            <Typography variant="body1">
              {gig.category}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Price
            </Typography>
            <Typography variant="body1">
              ${gig.price}/hr
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {gig.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Submitted: {formatDate(gig.submittedAt)}
          </Typography>
          <Box>
            <IconButton
              color="success"
              onClick={() => onStatusChange(gig.id, "approved")}
              disabled={gig.status === "approved"}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onStatusChange(gig.id, "rejected")}
              disabled={gig.status === "rejected"}
            >
              <CancelIcon />
            </IconButton>
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const GigAdminDashboard = () => {
  const [gigs, setGigs] = useState(dummyGigRequests);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");

  const handleStatusChange = (gigId, newStatus) => {
    setGigs(gigs.map(gig => 
      gig.id === gigId ? { ...gig, status: newStatus } : gig
    ));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter and sort gigs
  const filteredGigs = gigs
    .filter(gig => {
      const matchesStatus = gig.status === activeTab;
      const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gig.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter;
      return matchesStatus && matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (dateSort === "newest") {
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      } else {
        return new Date(a.submittedAt) - new Date(b.submittedAt);
      }
    });

  const getTabCount = (status) => gigs.filter(gig => gig.status === status).length;

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', p: 3 }}>
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Gig Approval Dashboard
        </Typography>

        {/* Search and Filter Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search gigs or sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Date Sort</InputLabel>
              <Select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                label="Date Sort"
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab 
            icon={<PendingIcon />}
            iconPosition="start"
            label={`Pending (${getTabCount("pending")})`}
            value="pending"
          />
          <Tab
            icon={<CheckCircleIcon />}
            iconPosition="start"
            label={`Approved (${getTabCount("approved")})`}
            value="approved"
          />
          <Tab
            icon={<CancelIcon />}
            iconPosition="start"
            label={`Rejected (${getTabCount("rejected")})`}
            value="rejected"
          />
        </Tabs>

        <Box>
          {filteredGigs.length > 0 ? (
            filteredGigs.map(gig => (
              <GigRequestCard 
                key={gig.id} 
                gig={gig} 
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ textAlign: 'center', py: 4 }}
            >
              No {activeTab} requests found
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default GigAdminDashboard;