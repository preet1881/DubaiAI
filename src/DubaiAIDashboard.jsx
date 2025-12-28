import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle, ChevronRight, Edit2, Save, Plus, Trash2, Link, FolderPlus, FilePlus, Loader2 } from 'lucide-react';
import { fetchAllDashboardData, updateStage, updateJourneyNotes, updateDependency, fetchUserPreferences, saveUserPreferences } from './api-normalized';

const DubaiAIDashboard = () => {
  // Default/initial data with all journeys - Complete Journey Data
  const defaultJourneyData = {
    'City Service': [
      {
        name: 'Property Sell (Sell/Buy)',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA QA Signoff (ae-AR)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'CX Design Feedback', status: 'active', progress: 60, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security HLD Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Signed Off' },
          { name: 'Security LLD Review', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security PenTesting', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Alignment Call to be setup on 10th Dec' }
        ],
        notes: 'Alignment Call to be setup on 10th Dec',
        dependencies: [
          { item: 'Load Testing', dependsOn: 'Infrastructure Setup', status: 'pending' }
        ]
      },
      {
        name: 'Domestic Worker',
        stages: [
          { name: 'API Integration', status: 'critical', progress: 30, eta: '', actual: '', notes: 'API not working with mock data' },
          { name: 'Build', status: 'active', progress: 50, eta: '', actual: '', notes: 'Partially build with API' },
          { name: 'UA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA QA Signoff (ae-AR)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'CX Design Feedback', status: 'active', progress: 60, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security HLD Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Signed Off' },
          { name: 'Security LLD Review', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security PenTesting', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'API not working with mock data',
        dependencies: [
          { item: 'API Integration', dependsOn: 'Third-party API vendor', status: 'blocked' }
        ]
      },
      {
        name: 'DEWA (Move In/Out/Move To)',
        stages: [
          { name: 'API Integration', status: 'critical', progress: 30, eta: '', actual: '', notes: 'API not working with mock data' },
          { name: 'Build', status: 'active', progress: 50, eta: '', actual: '', notes: 'Partially build with API' },
          { name: 'UA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA QA Signoff (ae-AR)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'CX Design Feedback', status: 'active', progress: 60, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security HLD Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Signed Off' },
          { name: 'Security LLD Review', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security PenTesting', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'API not working with mock data',
        dependencies: [
          { item: 'API Integration', dependsOn: 'DEWA API Access', status: 'blocked' }
        ]
      },
      {
        name: 'Visa Renewal Residency',
        stages: [
          { name: 'API Integration', status: 'active', progress: 70, eta: '', actual: '', notes: 'API Partially working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA QA Signoff (ae-AR)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'CX Design Feedback', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback Closed' },
          { name: 'Security HLD Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Signed Off' },
          { name: 'Security LLD Review', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security PenTesting', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'API Partially working with mock data',
        dependencies: [
          { item: 'API Integration', dependsOn: 'GDRFA API', status: 'in-progress' }
        ]
      },
      {
        name: 'Car Sell',
        stages: [
          { name: 'API Integration', status: 'critical', progress: 0, eta: '', actual: '', notes: 'Mock Data Pending' },
          { name: 'Build', status: 'active', progress: 50, eta: '', actual: '', notes: 'Partially build with API' },
          { name: 'UA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA QA Signoff (ae-AR)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'CX Design Feedback', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'Security HLD Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Signed Off' },
          { name: 'Security LLD Review', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security PenTesting', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Mock Data Pending',
        dependencies: [
          { item: 'API Integration', dependsOn: 'RTA Mock Data', status: 'blocked' }
        ]
      },
      {
        name: 'Car Accident',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'CX Design Feedback', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback Closed' },
          { name: 'Security HLD Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Signed Off' },
          { name: 'Security LLD Review', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security PenTesting', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' }
        ],
        notes: 'In progress',
        dependencies: []
      },
      {
        name: 'New Visa',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA QA Signoff (ae-AR)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'CX Design Feedback', status: 'done', progress: 100, eta: '', actual: '', notes: 'Feedback received' },
          { name: 'Security HLD Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Signed Off' },
          { name: 'Security LLD Review', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'Security PenTesting', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'API Working with mock data',
        dependencies: []
      }
    ],
    'Search': [
      {
        name: 'Hospital',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Google API key to be shared for search',
        dependencies: [
          { item: 'Search Functionality', dependsOn: 'Google API Key', status: 'pending' }
        ]
      },
      {
        name: 'Hotels',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Booking Integration', dependsOn: 'Vendor Selection', status: 'in-progress' }
        ]
      },
      {
        name: 'Restaurant',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Google API key to be shared for search',
        dependencies: [
          { item: 'Search Functionality', dependsOn: 'Google API Key', status: 'pending' }
        ]
      },
      {
        name: 'Attractions',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Data Integration', dependsOn: 'Vendor API', status: 'in-progress' }
        ]
      }
    ],
    'Events': [
      {
        name: 'Sports',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Event Data', dependsOn: 'Vendor API', status: 'in-progress' }
        ]
      },
      {
        name: 'Entertainment',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Event Data', dependsOn: 'Vendor API', status: 'in-progress' }
        ]
      },
      {
        name: 'Others',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Event Data', dependsOn: 'Vendor API', status: 'in-progress' }
        ]
      }
    ],
    'Booking': [
      {
        name: 'Hospital',
        stages: [
          { name: 'API Integration', status: 'critical', progress: 0, eta: '', actual: '', notes: 'Vendor to be finalized' },
          { name: 'Build', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'UA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'UA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Vendor Selection', dependsOn: 'Hospital Network Agreement', status: 'blocked' }
        ]
      },
      {
        name: 'Hotels',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Payment Gateway', dependsOn: 'Bank Integration', status: 'in-progress' }
        ]
      },
      {
        name: 'Restaurant',
        stages: [
          { name: 'API Integration', status: 'critical', progress: 0, eta: '', actual: '', notes: 'Vendor to be finalized' },
          { name: 'Build', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'UA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'UA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Vendor Selection', dependsOn: 'Restaurant Booking Platform', status: 'blocked' }
        ]
      },
      {
        name: 'Attractions',
        stages: [
          { name: 'API Integration', status: 'done', progress: 100, eta: '', actual: '', notes: 'API Working with mock data' },
          { name: 'Build', status: 'done', progress: 100, eta: '', actual: '', notes: 'Build (with API Integration) completed' },
          { name: 'UA QA Signoff (en-US)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA QA Signoff (ae-AR)', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed with API' },
          { name: 'UA - CX Review', status: 'done', progress: 100, eta: '', actual: '', notes: 'Completed' },
          { name: 'DDA QA Signoff (en-US)', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'active', progress: 50, eta: '', actual: '', notes: 'In progress' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Ticketing System', dependsOn: 'Vendor Integration', status: 'in-progress' }
        ]
      },
      {
        name: 'Events',
        stages: [
          { name: 'API Integration', status: 'critical', progress: 0, eta: '', actual: '', notes: 'Vendor to be finalized' },
          { name: 'Build', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'UA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'UA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' },
          { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: 'Yet to start' }
        ],
        notes: 'Vendor to be finalized',
        dependencies: [
          { item: 'Vendor Selection', dependsOn: 'Event Ticketing Platform', status: 'blocked' }
        ]
      }
    ]
  };

  // State management
  const [journeyData, setJourneyData] = useState(defaultJourneyData);
  const [selectedCategory, setSelectedCategory] = useState('City Service');
  const [selectedJourney, setSelectedJourney] = useState('Property Sell (Sell/Buy)');
  const [editMode, setEditMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddJourney, setShowAddJourney] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newJourneyName, setNewJourneyName] = useState('');
  const [editingJourneyName, setEditingJourneyName] = useState(null);
  const [tempJourneyName, setTempJourneyName] = useState('');
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  // Refs for debouncing API calls
  const saveTimeoutRef = useRef(null);
  const preferencesTimeoutRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  // Fetch data from API on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch dashboard data and preferences in parallel
        const [dashboardData, preferences] = await Promise.all([
          fetchAllDashboardData().catch((err) => {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load data from cloud storage. Using default data.');
            return defaultJourneyData;
          }),
          fetchUserPreferences().catch(() => ({ selectedCategory: 'City Service', selectedJourney: 'Property Sell (Sell/Buy)' }))
        ]);
        
        // Always use fetched data if available, even if empty (don't fall back to default)
        if (dashboardData && Object.keys(dashboardData).length > 0) {
          console.log('✅ Loaded data from database:', dashboardData);
          // Log specific journey to verify
          if (dashboardData['City Service']) {
            const newVisa = dashboardData['City Service'].find(j => j.name === 'New Visa');
            if (newVisa) {
              console.log('🔍 New Visa in fetched data:', newVisa.notes);
            }
          }
          setJourneyData(dashboardData);
        } else {
          console.warn('⚠️ No data returned from database, using default data');
          // Ensure we always set some data to prevent black screen
          setJourneyData(defaultJourneyData);
        }
        
        if (preferences) {
          if (preferences.selectedCategory) setSelectedCategory(preferences.selectedCategory);
          if (preferences.selectedJourney) setSelectedJourney(preferences.selectedJourney);
        }
      } catch (err) {
        console.error('Error loading data from API:', err);
        console.error('Error details:', err.message, err.stack);
        setError('Failed to load data from cloud storage. Using default data.');
        // Always set default data to prevent black screen
        setJourneyData(defaultJourneyData);
      } finally {
        setIsLoading(false);
        // Mark initial load as complete after a short delay to prevent immediate save
        setTimeout(() => {
          isInitialLoadRef.current = false;
        }, 1000);
      }
    };

    loadData();
  }, []);

  // Log version on mount to verify deployment (MUST be before any conditional returns)
  useEffect(() => {
    console.log('🚀 Dashboard Version: 2.0.0 - Normalized Tables');
    console.log('📅 Deployed:', new Date().toISOString());
    console.log('🔍 Check console for Supabase initialization status');
    console.log('📊 Current journeyData keys:', Object.keys(journeyData));
  }, []);

  // Note: Bulk save removed - now using granular updates per field

  // Debounced save preferences to API
  useEffect(() => {
    if (isLoading) return;

    if (preferencesTimeoutRef.current) {
      clearTimeout(preferencesTimeoutRef.current);
    }

    preferencesTimeoutRef.current = setTimeout(async () => {
      try {
        await saveUserPreferences({ selectedCategory, selectedJourney });
      } catch (err) {
        console.error('Error saving preferences to API:', err);
      }
    }, 500);

    return () => {
      if (preferencesTimeoutRef.current) {
        clearTimeout(preferencesTimeoutRef.current);
      }
    };
  }, [selectedCategory, selectedJourney, isLoading]);

  // Template for new stages
  const getDefaultStages = () => [
    { name: 'API Integration', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'Build', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'UA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'UA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'UA - CX Review', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'DDA QA Signoff (en-US)', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'DDA QA Signoff (ae-AR)', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'DDA - CX review', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'CX Design Feedback', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'Security HLD Review', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'Security LLD Review', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'Security PenTesting', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' },
    { name: 'Load Testing', status: 'not-started', progress: 0, eta: '', actual: '', notes: '' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'done': '#10b981',
      'active': '#3b82f6',
      'critical': '#ef4444',
      'pending': '#f59e0b',
      'blocked': '#dc2626',
      'completed': '#059669',
      'in-progress': '#2563eb'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    if (status === 'done') return <CheckCircle2 size={16} />;
    if (status === 'active') return <Clock size={16} />;
    if (status === 'critical') return <AlertCircle size={16} />;
    return <Calendar size={16} />;
  };

  const currentJourney = useMemo(() => {
    try {
      const category = journeyData[selectedCategory];
      if (!category || !Array.isArray(category)) {
        console.warn('Invalid category data:', selectedCategory, journeyData);
        return null;
      }
      return category.find(j => j.name === selectedJourney) || category[0] || null;
    } catch (error) {
      console.error('Error calculating currentJourney:', error);
      return null;
    }
  }, [selectedCategory, selectedJourney, journeyData]);

  const categoryStats = useMemo(() => {
    return Object.entries(journeyData).map(([category, journeys]) => {
      const totalStages = journeys.reduce((sum, j) => sum + j.stages.length, 0);
      const doneStages = journeys.reduce((sum, j) => 
        sum + j.stages.filter(s => s.status === 'done').length, 0
      );
      return {
        category,
        progress: totalStages > 0 ? Math.round((doneStages / totalStages) * 100) : 0,
        journeyCount: journeys.length
      };
    });
  }, [journeyData]);

  const updateStageLocal = (stageIndex, field, value) => {
    // Update local state only (no API call - will save on Save button click)
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
      const stage = newData[selectedCategory][journeyIndex].stages[stageIndex];
      stage[field] = value;
      return newData;
    });
  };

  // Save all changes when Save button is clicked
  const saveAllChanges = async () => {
    if (!currentJourney || !currentJourney.id) return;

    setIsSaving(true);
    setError(null);

    try {
      // Save journey notes
      if (currentJourney.notes !== undefined) {
        await updateJourneyNotes(currentJourney.id, currentJourney.notes || '');
      }

      // Save all stages
      if (currentJourney.stages) {
        const savePromises = currentJourney.stages.map(async (stage) => {
          if (stage.id) {
            const updates = {};
            if (stage.status !== undefined) updates.status = stage.status;
            if (stage.progress !== undefined) updates.progress = stage.progress;
            if (stage.eta !== undefined) {
              updates.eta = stage.eta === '' ? null : stage.eta;
            }
            if (stage.actual !== undefined) {
              updates.actual = stage.actual === '' ? null : stage.actual;
            }
            if (stage.notes !== undefined) updates.notes = stage.notes || '';
            
            if (Object.keys(updates).length > 0) {
              await updateStage(stage.id, updates);
            }
          }
        });
        await Promise.all(savePromises);
      }

      // Save all dependencies
      if (currentJourney.dependencies) {
        const depPromises = currentJourney.dependencies.map(async (dep) => {
          if (dep.id) {
            const updates = {};
            if (dep.item !== undefined) updates.item = dep.item;
            if (dep.dependsOn !== undefined) updates.depends_on = dep.dependsOn;
            if (dep.status !== undefined) updates.status = dep.status;
            
            if (Object.keys(updates).length > 0) {
              await updateDependency(dep.id, updates);
            }
          }
        });
        await Promise.all(depPromises);
      }

      setError(null);
    } catch (err) {
      console.error('Error saving changes:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addStage = () => {
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
      newData[selectedCategory][journeyIndex].stages.push({
        name: 'New Stage',
        status: 'not-started',
        progress: 0,
        eta: '',
        actual: '',
        notes: ''
      });
      return newData;
    });
  };

  const deleteStage = (stageIndex) => {
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
      newData[selectedCategory][journeyIndex].stages.splice(stageIndex, 1);
      return newData;
    });
  };

  const updateDependencyLocal = (depIndex, field, value) => {
    // Update local state only (no API call)
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
      newData[selectedCategory][journeyIndex].dependencies[depIndex][field] = value;
      return newData;
    });
  };

  const addDependency = () => {
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
      newData[selectedCategory][journeyIndex].dependencies.push({
        item: 'New Item',
        dependsOn: 'Dependency',
        status: 'pending'
      });
      return newData;
    });
  };

  const deleteDependency = (depIndex) => {
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
      newData[selectedCategory][journeyIndex].dependencies.splice(depIndex, 1);
      return newData;
    });
  };

  const updateNotes = (notes) => {
    // Update local state only (no API call)
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
      newData[selectedCategory][journeyIndex].notes = notes;
      return newData;
    });
  };

  const updateJourneyName = (oldName, newName) => {
    if (!newName.trim() || newName === oldName) return;
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const journeyIndex = newData[selectedCategory].findIndex(j => j.name === oldName);
      if (journeyIndex !== -1) {
        newData[selectedCategory][journeyIndex].name = newName;
        if (selectedJourney === oldName) {
          setSelectedJourney(newName);
        }
      }
      return newData;
    });
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    setJourneyData(prev => ({ ...prev, [newCategoryName]: [] }));
    setSelectedCategory(newCategoryName);
    setNewCategoryName('');
    setShowAddCategory(false);
  };

  const deleteCategory = (category) => {
    if (Object.keys(journeyData).length <= 1) {
      alert('Cannot delete the last category');
      return;
    }
    if (!window.confirm(`Delete "${category}"?`)) return;
    
    setJourneyData(prev => {
      const newData = { ...prev };
      delete newData[category];
      return newData;
    });
    
    const remaining = Object.keys(journeyData).filter(c => c !== category);
    setSelectedCategory(remaining[0]);
    setSelectedJourney(journeyData[remaining[0]][0]?.name || '');
  };

  const addJourney = () => {
    if (!newJourneyName.trim()) return;
    
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData[selectedCategory].push({
        name: newJourneyName,
        stages: getDefaultStages(),
        notes: '',
        dependencies: []
      });
      return newData;
    });
    
    setSelectedJourney(newJourneyName);
    setNewJourneyName('');
    setShowAddJourney(false);
  };

  const deleteJourney = (journeyName) => {
    if (journeyData[selectedCategory].length <= 1) {
      alert('Cannot delete the last journey');
      return;
    }
    if (!window.confirm(`Delete "${journeyName}"?`)) return;
    
    setJourneyData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData[selectedCategory] = newData[selectedCategory].filter(j => j.name !== journeyName);
      return newData;
    });
    
    const remaining = journeyData[selectedCategory].filter(j => j.name !== journeyName);
    setSelectedJourney(remaining[0]?.name || '');
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <Loader2 size={48} className="animate-spin" style={{ color: '#60a5fa' }} />
        <div style={{ fontSize: '18px', fontWeight: '600' }}>Loading dashboard from cloud storage...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#e2e8f0',
      display: 'flex',
      position: 'relative'
    }}>
      {/* Error Banner */}
      {error && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(239, 68, 68, 0.9)',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '0 8px',
              marginLeft: 'auto'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Saving Indicator */}
      {isSaving && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(59, 130, 246, 0.9)',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <Loader2 size={16} className="animate-spin" />
          <span>Saving to cloud storage...</span>
        </div>
      )}

      {/* Sidebar */}
      <div style={{
        width: '320px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(148, 163, 184, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0
      }}>
        {/* Header */}
        <div style={{
          padding: '32px 24px',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            Dubai AI
          </div>
          <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
            Action Plan Timeline
          </div>
        </div>

        {/* Categories */}
        <div style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              color: '#64748b',
              fontWeight: '700'
            }}>
              Overview
            </div>
            {editMode && (
              <button
                onClick={() => setShowAddCategory(!showAddCategory)}
                style={{
                  padding: '6px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '6px',
                  color: '#60a5fa',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <FolderPlus size={14} />
              </button>
            )}
          </div>

          {showAddCategory && (
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: '8px'
            }}>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name..."
                onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  marginBottom: '8px',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={addCategory} style={{
                  flex: 1,
                  padding: '6px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10b981',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Add
                </button>
                <button onClick={() => {
                  setShowAddCategory(false);
                  setNewCategoryName('');
                }} style={{
                  flex: 1,
                  padding: '6px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  color: '#ef4444',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categoryStats.map(({ category, progress, journeyCount }) => (
              <div key={category} style={{ position: 'relative' }}>
                <div
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedJourney(journeyData[category][0]?.name || '');
                  }}
                  style={{
                    padding: '16px',
                    background: selectedCategory === category 
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))'
                      : 'rgba(30, 41, 59, 0.5)',
                    border: selectedCategory === category
                      ? '1px solid rgba(59, 130, 246, 0.3)'
                      : '1px solid rgba(148, 163, 184, 0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontSize: '15px', fontWeight: '700' }}>{category}</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      background: 'rgba(15, 23, 42, 0.6)',
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      {journeyCount}
                    </div>
                  </div>
                  <div style={{
                    height: '6px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      borderRadius: '3px'
                    }} />
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                    {progress}% Complete
                  </div>
                </div>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(category);
                    }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      padding: '6px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '6px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      display: 'flex'
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Journeys */}
        <div style={{ padding: '24px', flex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              color: '#64748b',
              fontWeight: '700'
            }}>
              Journeys
            </div>
            <button
              onClick={() => setShowAddJourney(!showAddJourney)}
              style={{
                padding: '6px 8px',
                background: showAddJourney 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'rgba(59, 130, 246, 0.15)',
                border: showAddJourney
                  ? '1px solid rgba(16, 185, 129, 0.4)'
                  : '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '6px',
                color: showAddJourney ? '#10b981' : '#60a5fa',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s'
              }}
              title="Add New Journey"
            >
              <FilePlus size={14} />
              {showAddJourney && <span style={{ fontSize: '11px', fontWeight: '600' }}>Cancel</span>}
            </button>
          </div>

          {showAddJourney && (
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: '8px'
            }}>
              <input
                type="text"
                value={newJourneyName}
                onChange={(e) => setNewJourneyName(e.target.value)}
                placeholder="Journey name..."
                onKeyPress={(e) => e.key === 'Enter' && addJourney()}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  marginBottom: '8px',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={addJourney} style={{
                  flex: 1,
                  padding: '6px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10b981',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Add
                </button>
                <button onClick={() => {
                  setShowAddJourney(false);
                  setNewJourneyName('');
                }} style={{
                  flex: 1,
                  padding: '6px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  color: '#ef4444',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {journeyData[selectedCategory]?.map((journey) => (
              <div key={journey.name} style={{ position: 'relative' }}>
                <div
                  onClick={() => {
                    if (editingJourneyName !== journey.name) {
                      setSelectedJourney(journey.name);
                    }
                  }}
                  style={{
                    padding: '14px 16px',
                    paddingRight: editMode ? '80px' : '16px',
                    background: selectedJourney === journey.name
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'transparent',
                    border: selectedJourney === journey.name
                      ? '1px solid rgba(59, 130, 246, 0.3)'
                      : '1px solid transparent',
                    borderRadius: '10px',
                    cursor: editingJourneyName === journey.name ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {editingJourneyName === journey.name && editMode ? (
                    <input
                      type="text"
                      value={tempJourneyName}
                      onChange={(e) => setTempJourneyName(e.target.value)}
                      onBlur={() => {
                        if (tempJourneyName.trim() && tempJourneyName !== journey.name) {
                          updateJourneyName(journey.name, tempJourneyName);
                        }
                        setEditingJourneyName(null);
                        setTempJourneyName('');
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          if (tempJourneyName.trim() && tempJourneyName !== journey.name) {
                            updateJourneyName(journey.name, tempJourneyName);
                          }
                          setEditingJourneyName(null);
                          setTempJourneyName('');
                        } else if (e.key === 'Escape') {
                          setEditingJourneyName(null);
                          setTempJourneyName('');
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(59, 130, 246, 0.5)',
                        borderRadius: '6px',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        fontWeight: '600'
                      }}
                    />
                  ) : (
                    <div 
                      style={{
                        fontSize: '14px',
                        fontWeight: selectedJourney === journey.name ? '700' : '600',
                        color: selectedJourney === journey.name ? '#f1f5f9' : '#cbd5e1',
                        flex: 1
                      }}
                      onDoubleClick={(e) => {
                        if (editMode) {
                          e.stopPropagation();
                          setEditingJourneyName(journey.name);
                          setTempJourneyName(journey.name);
                        }
                      }}
                      title={editMode ? 'Double-click to edit' : ''}
                    >
                      {journey.name}
                    </div>
                  )}
                  {selectedJourney === journey.name && editingJourneyName !== journey.name && (
                    <ChevronRight size={18} color="#60a5fa" />
                  )}
                </div>
                {editMode && editingJourneyName !== journey.name && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '8px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    gap: '4px'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingJourneyName(journey.name);
                        setTempJourneyName(journey.name);
                      }}
                      style={{
                        padding: '6px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        color: '#60a5fa',
                        cursor: 'pointer',
                        display: 'flex'
                      }}
                      title="Edit name"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteJourney(journey.name);
                      }}
                      style={{
                        padding: '6px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        cursor: 'pointer',
                        display: 'flex'
                      }}
                      title="Delete journey"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {/* Quick Add Journey Button at the end */}
            {!showAddJourney && (
              <button
                onClick={() => setShowAddJourney(true)}
                style={{
                  padding: '12px 16px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '2px dashed rgba(59, 130, 246, 0.3)',
                  borderRadius: '10px',
                  color: '#60a5fa',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
              >
                <Plus size={14} />
                Add Journey
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontSize: '14px',
              color: '#94a3b8',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              {selectedCategory}
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#f1f5f9',
              marginBottom: '12px'
            }}>
              {currentJourney?.name}
            </div>
            {currentJourney?.notes && (
              editMode ? (
                <input
                  type="text"
                  value={currentJourney.notes}
                  onChange={(e) => updateNotes(e.target.value)}
                  placeholder="Add notes..."
                  style={{
                    padding: '10px 16px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '8px',
                    color: '#fbbf24',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    width: '100%',
                    maxWidth: '500px'
                  }}
                />
              ) : (
                <div style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '8px',
                  color: '#fbbf24',
                  fontSize: '14px'
                }}>
                  📌 {currentJourney.notes}
                </div>
              )
            )}
          </div>
          <button
            onClick={async () => {
              if (editMode) {
                // Save all changes when clicking Save
                await saveAllChanges();
                setEditMode(false);
              } else {
                // Enter edit mode
                setEditMode(true);
              }
            }}
            disabled={isSaving}
            style={{
              padding: '12px 24px',
              background: editMode 
                ? 'linear-gradient(135deg, #10b981, #059669)' 
                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '700',
              cursor: isSaving ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: 'fit-content',
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? (
              <><Loader2 size={16} className="animate-spin" /> Saving...</>
            ) : editMode ? (
              <><Save size={16} /> Save Changes</>
            ) : (
              <><Edit2 size={16} /> Edit Mode</>
            )}
          </button>
        </div>

        {/* Gantt Chart */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#f1f5f9',
            marginBottom: '24px'
          }}>
            Progress Timeline
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentJourney?.stages.map((stage, index) => (
              <div key={index}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '8px'
                }}>
                  <div style={{ color: getStatusColor(stage.status), display: 'flex' }}>
                    {getStatusIcon(stage.status)}
                  </div>
                  
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={stage.name}
                        onChange={(e) => updateStageLocal(index, 'name', e.target.value)}
                        style={{
                          minWidth: '200px',
                          padding: '8px 12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          borderRadius: '6px',
                          color: '#e2e8f0',
                          fontSize: '15px',
                          fontFamily: 'inherit'
                        }}
                      />
                      <select
                        value={stage.status}
                        onChange={(e) => updateStageLocal(index, 'status', e.target.value)}
                        style={{
                          padding: '8px 12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          borderRadius: '6px',
                          color: '#e2e8f0',
                          fontSize: '13px',
                          fontFamily: 'inherit',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="done">Done</option>
                        <option value="active">Active</option>
                        <option value="critical">Critical</option>
                        <option value="pending">Pending</option>
                        <option value="not-started">Not Started</option>
                      </select>
                      <input
                        type="number"
                        value={stage.progress}
                        onChange={(e) => updateStageLocal(index, 'progress', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                        style={{
                          width: '80px',
                          padding: '8px 12px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          borderRadius: '6px',
                          color: '#e2e8f0',
                          fontSize: '13px',
                          fontFamily: 'inherit'
                        }}
                      />
                    </>
                  ) : (
                    <div style={{ minWidth: '200px', fontSize: '15px', fontWeight: '600', color: '#e2e8f0' }}>
                      {stage.name}
                    </div>
                  )}

                  <div style={{
                    flex: 1,
                    height: '32px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid rgba(148, 163, 184, 0.1)'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${stage.progress}%`,
                      background: getStatusColor(stage.status),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '12px'
                    }}>
                      {stage.progress > 15 && (
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>
                          {stage.progress}%
                        </span>
                      )}
                    </div>
                  </div>

                  {editMode && (
                    <button
                      onClick={() => deleteStage(index)}
                      style={{
                        padding: '8px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        cursor: 'pointer',
                        display: 'flex'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {/* ETA and Actual */}
                <div style={{ display: 'flex', gap: '16px', marginLeft: '32px', marginTop: '8px', minHeight: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '180px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>ETA:</span>
                    {editMode ? (
                      <input
                        type="date"
                        value={stage.eta || ''}
                        onChange={(e) => updateStageLocal(index, 'eta', e.target.value || '')}
                        style={{
                          padding: '6px 10px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          borderRadius: '6px',
                          color: '#e2e8f0',
                          fontSize: '12px',
                          fontFamily: 'inherit',
                          minWidth: '150px',
                          width: '150px',
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '13px', color: '#cbd5e1', minWidth: '150px' }}>
                        {stage.eta || 'Not set'}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '180px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>Actual:</span>
                    {editMode ? (
                      <input
                        type="date"
                        value={stage.actual || ''}
                        onChange={(e) => updateStageLocal(index, 'actual', e.target.value || '')}
                        style={{
                          padding: '6px 10px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          borderRadius: '6px',
                          color: '#e2e8f0',
                          fontSize: '12px',
                          fontFamily: 'inherit',
                          minWidth: '150px',
                          width: '150px',
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '13px', color: '#cbd5e1', minWidth: '150px' }}>
                        {stage.actual || 'Pending'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {editMode && (
            <button
              onClick={addStage}
              style={{
                marginTop: '16px',
                padding: '12px 20px',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                color: '#60a5fa',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={16} /> Add Stage
            </button>
          )}
        </div>

        {/* Dependencies Table */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Link size={20} color="#60a5fa" />
              Dependencies
            </div>
            {editMode && (
              <button
                onClick={addDependency}
                style={{
                  padding: '10px 18px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#60a5fa',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} /> Add Dependency
              </button>
            )}
          </div>

          {currentJourney?.dependencies && currentJourney.dependencies.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
                  }}>
                    Item
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
                  }}>
                    Depends On
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
                  }}>
                    Status
                  </th>
                  {editMode && (
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                      width: '80px'
                    }}>
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentJourney.dependencies.map((dep, index) => (
                  <tr key={index}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#e2e8f0' }}>
                      {editMode ? (
                        <input
                          type="text"
                          value={dep.item}
                          onChange={(e) => updateDependencyLocal(index, 'item', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '6px',
                            color: '#e2e8f0',
                            fontSize: '14px',
                            fontFamily: 'inherit'
                          }}
                        />
                      ) : dep.item}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#cbd5e1' }}>
                      {editMode ? (
                        <input
                          type="text"
                          value={dep.dependsOn}
                          onChange={(e) => updateDependencyLocal(index, 'dependsOn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '6px',
                            color: '#e2e8f0',
                            fontSize: '14px',
                            fontFamily: 'inherit'
                          }}
                        />
                      ) : dep.dependsOn}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {editMode ? (
                        <select
                          value={dep.status}
                          onChange={(e) => updateDependencyLocal(index, 'status', e.target.value)}
                          style={{
                            padding: '8px 12px',
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '6px',
                            color: '#e2e8f0',
                            fontSize: '13px',
                            fontFamily: 'inherit',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="completed">Completed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="pending">Pending</option>
                          <option value="blocked">Blocked</option>
                        </select>
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          background: `${getStatusColor(dep.status)}20`,
                          color: getStatusColor(dep.status),
                          border: `1px solid ${getStatusColor(dep.status)}40`
                        }}>
                          {dep.status}
                        </span>
                      )}
                    </td>
                    {editMode && (
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => deleteDependency(index)}
                          style={{
                            padding: '8px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '6px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            display: 'inline-flex'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#64748b',
              fontSize: '14px'
            }}>
              No dependencies defined for this journey.
            </div>
          )}
        </div>

        {/* Overall Progress */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          borderRadius: '16px',
          padding: '32px'
        }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#f1f5f9', marginBottom: '16px' }}>
            Overall Progress
          </div>
          <div style={{
            height: '12px',
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid rgba(148, 163, 184, 0.1)'
          }}>
            <div style={{
              height: '100%',
              width: `${Math.round(
                (currentJourney?.stages.filter(s => s.status === 'done').length / 
                currentJourney?.stages.length) * 100
              )}%`,
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
              borderRadius: '6px'
            }} />
          </div>
          <div style={{ marginTop: '12px', fontSize: '14px', color: '#94a3b8' }}>
            {currentJourney?.stages.filter(s => s.status === 'done').length} of {currentJourney?.stages.length} stages completed
          </div>
        </div>
      </div>

      <style>
        {`
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
          }
          *::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          *::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.3);
            border-radius: 4px;
          }
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default DubaiAIDashboard;

