import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle, ChevronRight, ChevronLeft, Edit2, Save, Plus, Trash2, Link, FolderPlus, FilePlus, Loader2, Sun, Moon } from 'lucide-react';
import { fetchAllDashboardData, updateStage, updateJourneyNotes, updateJourney, updateDependency, createDependency, deleteDependency, createCategory, deleteCategory as deleteCategoryAPI, updateCategory, getCategoryByName, createJourney, deleteJourney as deleteJourneyAPI, createStage, deleteStage as deleteStageAPI, fetchUserPreferences, saveUserPreferences } from './api-normalized';

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
          { item: 'Load Testing', dependsOn: 'Infrastructure Setup', status: 'critical' }
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
          { item: 'API Integration', dependsOn: 'Third-party API vendor', status: 'critical' }
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
          { item: 'API Integration', dependsOn: 'DEWA API Access', status: 'critical' }
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
          { item: 'API Integration', dependsOn: 'RTA Mock Data', status: 'critical' }
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
          { item: 'Search Functionality', dependsOn: 'Google API Key', status: 'critical' }
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
          { item: 'Search Functionality', dependsOn: 'Google API Key', status: 'critical' }
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
          { item: 'Vendor Selection', dependsOn: 'Hospital Network Agreement', status: 'critical' }
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
          { item: 'Vendor Selection', dependsOn: 'Restaurant Booking Platform', status: 'critical' }
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
          { item: 'Vendor Selection', dependsOn: 'Event Ticketing Platform', status: 'critical' }
        ]
      }
    ]
  };

  // Theme configuration
  const themes = {
    dark: {
      bg: {
        main: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        card: 'rgba(30, 41, 59, 0.5)',
        cardHover: 'rgba(30, 41, 59, 0.8)',
        sidebar: 'rgba(15, 23, 42, 0.8)',
        input: 'rgba(15, 23, 42, 0.8)',
        inputFocus: 'rgba(30, 41, 59, 0.6)',
        button: 'rgba(59, 130, 246, 0.15)',
        buttonHover: 'rgba(59, 130, 246, 0.25)',
        error: 'rgba(239, 68, 68, 0.9)',
        saving: 'rgba(59, 130, 246, 0.9)',
        notes: 'rgba(30, 41, 59, 0.4)',
        stageCard: 'rgba(15, 23, 42, 0.8)',
        progressBar: 'rgba(15, 23, 42, 0.8)',
        tableHeader: 'rgba(15, 23, 42, 0.6)',
        categoryCard: 'rgba(30, 41, 59, 0.5)',
        categoryCardSelected: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
        journeyNote: 'rgba(245, 158, 11, 0.1)',
        journeyNoteBorder: 'rgba(245, 158, 11, 0.3)',
        journeyNoteText: '#fbbf24',
        journeyItem: 'transparent',
        journeyItemSelected: 'rgba(59, 130, 246, 0.25)',
        journeyItemSelectedBorder: 'rgba(59, 130, 246, 0.5)'
      },
      text: {
        primary: '#f1f5f9',
        secondary: '#e2e8f0',
        tertiary: '#cbd5e1',
        muted: '#94a3b8',
        disabled: '#64748b',
        journeyNote: '#fbbf24'
      },
      border: {
        default: 'rgba(148, 163, 184, 0.1)',
        focus: 'rgba(148, 163, 184, 0.2)',
        accent: 'rgba(59, 130, 246, 0.3)',
        categorySelected: 'rgba(59, 130, 246, 0.3)',
        journeyNote: 'rgba(245, 158, 11, 0.3)'
      },
      status: {
        notStarted: '#6b7280',
        inProgress: '#3b82f6',
        critical: '#ef4444',
        done: '#10b981',
        inProgressBg: 'rgba(59, 130, 246, 0.15)',
        criticalBg: 'rgba(239, 68, 68, 0.15)',
        doneBg: 'rgba(16, 185, 129, 0.15)'
      }
    },
    light: {
      bg: {
        main: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        card: 'rgba(255, 255, 255, 0.9)',
        cardHover: 'rgba(255, 255, 255, 1)',
        sidebar: 'rgba(255, 255, 255, 0.95)',
        input: 'rgba(248, 250, 252, 0.9)',
        inputFocus: 'rgba(241, 245, 249, 1)',
        button: 'rgba(59, 130, 246, 0.1)',
        buttonHover: 'rgba(59, 130, 246, 0.2)',
        error: 'rgba(239, 68, 68, 0.95)',
        saving: 'rgba(59, 130, 246, 0.95)',
        notes: 'rgba(241, 245, 249, 0.9)',
        stageCard: 'rgba(255, 255, 255, 0.95)',
        progressBar: 'rgba(241, 245, 249, 0.8)',
        tableHeader: 'rgba(241, 245, 249, 0.8)',
        categoryCard: 'rgba(255, 255, 255, 0.8)',
        categoryCardSelected: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
        journeyNote: 'rgba(254, 243, 199, 0.95)',
        journeyNoteBorder: 'rgba(217, 119, 6, 0.7)',
        journeyNoteText: '#92400e',
        journeyItem: 'rgba(241, 245, 249, 0.7)',
        journeyItemSelected: 'rgba(59, 130, 246, 0.35)',
        journeyItemSelectedBorder: 'rgba(59, 130, 246, 0.6)'
      },
      text: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
        muted: '#64748b',
        disabled: '#94a3b8',
        journeyNote: '#92400e'
      },
      border: {
        default: 'rgba(148, 163, 184, 0.3)',
        focus: 'rgba(148, 163, 184, 0.4)',
        accent: 'rgba(59, 130, 246, 0.4)',
        categorySelected: 'rgba(59, 130, 246, 0.5)',
        journeyNote: 'rgba(217, 119, 6, 0.7)'
      },
      status: {
        notStarted: '#64748b',
        inProgress: '#2563eb',
        critical: '#dc2626',
        done: '#059669',
        inProgressBg: 'rgba(59, 130, 246, 0.15)',
        criticalBg: 'rgba(239, 68, 68, 0.15)',
        doneBg: 'rgba(16, 185, 129, 0.15)'
      }
    }
  };

  // Theme state - load from localStorage or default to dark
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('dubai-ai-theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  const currentTheme = themes[theme];

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('dubai-ai-theme', newTheme);
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
  const [showJourneyNotesInput, setShowJourneyNotesInput] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  
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

  // Add global styles via useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'dubai-ai-styles';
    const filterValue = theme === 'dark' ? 'invert(1)' : 'invert(0)';
    const cssText = [
      '* { scrollbar-width: thin; scrollbar-color: rgba(148, 163, 184, 0.3) transparent; }',
      '*::-webkit-scrollbar { width: 8px; height: 8px; }',
      '*::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.3); border-radius: 4px; }',
      '.kanban-column-scroll { scrollbar-width: thin; scrollbar-color: rgba(148, 163, 184, 0.4) transparent; }',
      '.kanban-column-scroll::-webkit-scrollbar { width: 6px; }',
      '.kanban-column-scroll::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.4); border-radius: 3px; }',
      '.kanban-column-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.6); }',
      'input[type="date"]::-webkit-calendar-picker-indicator { filter: ' + filterValue + '; cursor: pointer; }',
      'input[type="date"]::-webkit-inner-spin-button { filter: ' + filterValue + '; }',
      '.kanban-grid { display: grid; grid-template-columns: repeat(2, 1fr); }',
      '@media (max-width: 1200px) { .kanban-grid { grid-template-columns: repeat(2, 1fr) !important; } }',
      '@media (max-width: 768px) { .kanban-grid { grid-template-columns: 1fr !important; } }',
      '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      '.animate-spin { animation: spin 1s linear infinite; }'
    ].join(' ');
    style.textContent = cssText;
    const existing = document.getElementById('dubai-ai-styles');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(style);
    return () => {
      const styleEl = document.getElementById('dubai-ai-styles');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [theme]);

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

  // Kanban column configuration - 4 statuses only
  const kanbanColumns = [
    { 
      status: 'not-started', 
      label: 'Not Started', 
      color: '#6b7280',
      bgColor: 'rgba(107, 114, 128, 0.1)',
      borderColor: 'rgba(107, 114, 128, 0.3)'
    },
    { 
      status: 'active', 
      label: 'In Progress', 
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.3)'
    },
    { 
      status: 'critical', 
      label: 'Critical', 
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)'
    },
    { 
      status: 'done', 
      label: 'Done', 
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)'
    }
  ];

  // Map status to column (map pending/blocked to critical)
  const getColumnForStatus = (status) => {
    if (status === 'pending' || status === 'blocked') return 'critical';
    return status;
  };

  // Group stages by status for Kanban
  const getStagesByStatus = (status) => {
    if (!currentJourney?.stages) return [];
    return currentJourney.stages
      .map((stage, index) => ({ ...stage, originalIndex: index }))
      .filter(stage => getColumnForStatus(stage.status) === status)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
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

  // Calculate overall progress percentage
  const overallProgress = useMemo(() => {
    const doneCount = currentJourney?.stages?.filter(s => s.status === 'done').length || 0;
    const totalCount = currentJourney?.stages?.length || 1;
    return totalCount > 0 ? Math.round((doneCount * 100) / totalCount) : 0;
  }, [currentJourney]);

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
        const stageUpdates = [];
        const newStages = [];
        
        // Separate updates and creates
        currentJourney.stages.forEach((stage, index) => {
          if (stage.id) {
            // Update existing stage
            const updates = {};
            if (stage.name !== undefined) updates.name = stage.name;
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
              stageUpdates.push({ id: stage.id, updates, originalIndex: index });
            }
          } else {
            // Create new stage
            newStages.push({ stage, originalIndex: index });
          }
        });
        
        // Execute all updates
        await Promise.all(
          stageUpdates.map(({ id, updates }) => updateStage(id, updates))
        );
        
        // Create all new stages
        const createdStages = await Promise.all(
          newStages.map(({ stage }) => 
            createStage(currentJourney.id, {
              name: stage.name || 'New Stage',
              status: stage.status || 'not-started',
              progress: stage.progress || 0,
              eta: stage.eta === '' ? null : stage.eta,
              actual: stage.actual === '' ? null : stage.actual,
              notes: stage.notes || '',
              display_order: stage.display_order || currentJourney.stages.length
            })
          )
        );
        
        // Update local state with new IDs
        if (createdStages.length > 0) {
          setJourneyData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
            newStages.forEach(({ originalIndex }, i) => {
              const createdStage = createdStages[i];
              if (newData[selectedCategory][journeyIndex].stages[originalIndex]) {
                newData[selectedCategory][journeyIndex].stages[originalIndex] = {
                  id: createdStage.id,
                  name: createdStage.name,
                  status: createdStage.status,
                  progress: createdStage.progress,
                  eta: createdStage.eta || '',
                  actual: createdStage.actual || '',
                  notes: createdStage.notes || '',
                  display_order: createdStage.display_order
                };
              }
            });
            return newData;
          });
        }
      }

      // Save all dependencies
      if (currentJourney.dependencies) {
        const depUpdates = [];
        const newDeps = [];
        
        // Separate updates and creates
        currentJourney.dependencies.forEach((dep, index) => {
          if (dep.id) {
            // Update existing dependency
            const updates = {};
            if (dep.item !== undefined) updates.item = dep.item;
            if (dep.dependsOn !== undefined) updates.depends_on = dep.dependsOn;
            if (dep.status !== undefined) updates.status = dep.status;
            
            if (Object.keys(updates).length > 0) {
              depUpdates.push({ id: dep.id, updates, originalIndex: index });
            }
          } else {
            // Create new dependency
            newDeps.push({ dep, originalIndex: index });
          }
        });
        
        // Execute all updates
        await Promise.all(
          depUpdates.map(({ id, updates }) => updateDependency(id, updates))
        );
        
        // Create all new dependencies
        const createdDeps = await Promise.all(
          newDeps.map(({ dep }) => 
            createDependency(currentJourney.id, {
              item: dep.item || 'New Item',
              dependsOn: dep.dependsOn || 'Dependency',
              status: dep.status || 'critical'
            })
          )
        );
        
        // Update local state with new IDs
        if (createdDeps.length > 0) {
          setJourneyData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
            newDeps.forEach(({ originalIndex }, i) => {
              const createdDep = createdDeps[i];
              if (newData[selectedCategory][journeyIndex].dependencies[originalIndex]) {
                newData[selectedCategory][journeyIndex].dependencies[originalIndex] = {
                  id: createdDep.id,
                  item: createdDep.item,
                  dependsOn: createdDep.depends_on,
                  status: createdDep.status
                };
              }
            });
            return newData;
          });
        }
      }

      setError(null);
    } catch (err) {
      console.error('Error saving changes:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addStage = async () => {
    if (!currentJourney || !currentJourney.id) {
      alert('Please select a journey first');
      return;
    }
    
    try {
      // Get max display_order for this journey's stages
      const maxOrder = currentJourney.stages.length > 0
        ? Math.max(...currentJourney.stages.map(s => s.display_order || 0), -1)
        : -1;
      
      // Create stage in database
      const newStage = await createStage(currentJourney.id, {
        name: 'New Stage',
        status: 'not-started',
        progress: 0,
        eta: null,
        actual: null,
        notes: '',
        display_order: maxOrder + 1
      });
      
      // Update local state with new stage (including ID)
      setJourneyData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
        if (journeyIndex !== -1) {
          newData[selectedCategory][journeyIndex].stages.push({
            id: newStage.id,
            name: newStage.name,
            status: newStage.status,
            progress: newStage.progress,
            eta: newStage.eta || '',
            actual: newStage.actual || '',
            notes: newStage.notes || '',
            display_order: newStage.display_order
          });
        }
        return newData;
      });
    } catch (err) {
      console.error('Error creating stage:', err);
      alert('Failed to create stage. Please try again.');
    }
  };

  const deleteStage = async (stageIndex) => {
    if (!currentJourney || !currentJourney.stages || !currentJourney.stages[stageIndex]) {
      return;
    }
    
    const stage = currentJourney.stages[stageIndex];
    
    try {
      // Delete from database if it has an ID
      if (stage.id) {
        await deleteStageAPI(stage.id);
      }
      
      // Remove from local state
      setJourneyData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        const journeyIndex = newData[selectedCategory].findIndex(j => j.name === selectedJourney);
        if (journeyIndex !== -1) {
          newData[selectedCategory][journeyIndex].stages.splice(stageIndex, 1);
        }
        return newData;
      });
    } catch (err) {
      console.error('Error deleting stage:', err);
      alert('Failed to delete stage. Please try again.');
    }
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
        status: 'critical'
      });
      return newData;
    });
  };

  const deleteDependencyLocal = async (depIndex) => {
    const dep = currentJourney?.dependencies[depIndex];
    
    // Delete from database if it has an ID
    if (dep?.id) {
      try {
        await deleteDependency(dep.id);
      } catch (err) {
        console.error('Error deleting dependency from database:', err);
        // Still remove from local state even if DB delete fails
      }
    }
    
    // Remove from local state
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

  const updateJourneyName = async (oldName, newName) => {
    if (!newName.trim() || newName === oldName) return;
    
    try {
      // Find the journey in current data to get its ID
      const journey = journeyData[selectedCategory].find(j => j.name === oldName);
      if (!journey || !journey.id) {
        console.error('Journey not found or missing ID');
        return;
      }
      
      // Update journey name in database
      await updateJourney(journey.id, { name: newName });
      
      // Update local state
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
    } catch (err) {
      console.error('Error updating journey name:', err);
      alert('Failed to update journey name. Please try again.');
    }
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      // Get max display_order to append new category at the end
      const maxOrder = Math.max(...Object.values(journeyData).map((_, idx) => idx), -1);
      
      // Create category in database
      await createCategory(newCategoryName, maxOrder + 1);
      
      // Refresh data from database
      const freshData = await fetchAllDashboardData();
      setJourneyData(freshData);
      
      // Select the new category
      setSelectedCategory(newCategoryName);
      setNewCategoryName('');
      setShowAddCategory(false);
    } catch (err) {
      console.error('Error creating category:', err);
      alert('Failed to create category. Please try again.');
    }
  };

  const deleteCategory = async (category) => {
    if (Object.keys(journeyData).length <= 1) {
      alert('Cannot delete the last category');
      return;
    }
    if (!window.confirm(`Delete "${category}"? This will delete all journeys, stages, and dependencies in this category.`)) return;
    
    try {
      // Get category ID from database
      const categoryData = await getCategoryByName(category);
      if (!categoryData) {
        alert('Category not found in database');
        return;
      }
      
      // Delete category from database (cascades to journeys, stages, dependencies)
      await deleteCategoryAPI(categoryData.id);
      
      // Refresh data from database
      const freshData = await fetchAllDashboardData();
      setJourneyData(freshData);
      
      // Select first remaining category
      const remaining = Object.keys(freshData);
      if (remaining.length > 0) {
        setSelectedCategory(remaining[0]);
        setSelectedJourney(freshData[remaining[0]][0]?.name || '');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Failed to delete category. Please try again.');
    }
  };

  const addJourney = async () => {
    if (!newJourneyName.trim()) return;
    
    try {
      // Get category ID from database
      const categoryData = await getCategoryByName(selectedCategory);
      if (!categoryData) {
        alert('Category not found in database');
        return;
      }
      
      // Create journey in database
      const newJourney = await createJourney(categoryData.id, {
        name: newJourneyName,
        notes: ''
      });
      
      // Create default stages for the journey
      const defaultStages = getDefaultStages();
      for (let i = 0; i < defaultStages.length; i++) {
        await createStage(newJourney.id, {
          ...defaultStages[i],
          display_order: i
        });
      }
      
      // Refresh data from database
      const freshData = await fetchAllDashboardData();
      setJourneyData(freshData);
      
      // Select the new journey
      setSelectedJourney(newJourneyName);
      setNewJourneyName('');
      setShowAddJourney(false);
    } catch (err) {
      console.error('Error creating journey:', err);
      alert('Failed to create journey. Please try again.');
    }
  };

  const deleteJourney = async (journeyName) => {
    if (journeyData[selectedCategory].length <= 1) {
      alert('Cannot delete the last journey');
      return;
    }
    if (!window.confirm(`Delete "${journeyName}"? This will delete all stages and dependencies for this journey.`)) return;
    
    try {
      // Find the journey in current data to get its ID
      const journey = journeyData[selectedCategory].find(j => j.name === journeyName);
      if (!journey || !journey.id) {
        alert('Journey not found in database');
        return;
      }
      
      // Delete journey from database (cascades to stages and dependencies)
      await deleteJourneyAPI(journey.id);
      
      // Refresh data from database
      const freshData = await fetchAllDashboardData();
      setJourneyData(freshData);
      
      // Select first remaining journey in category
      if (selectedJourney === journeyName) {
        const remaining = freshData[selectedCategory] || [];
        if (remaining.length > 0) {
          setSelectedJourney(remaining[0]?.name || '');
        } else {
          // If no journeys left in category, select first journey from first category
          const firstCategory = Object.keys(freshData)[0];
          if (firstCategory && freshData[firstCategory].length > 0) {
            setSelectedCategory(firstCategory);
            setSelectedJourney(freshData[firstCategory][0]?.name || '');
          }
        }
      }
    } catch (err) {
      console.error('Error deleting journey:', err);
      alert('Failed to delete journey. Please try again.');
    }
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: currentTheme.bg.main,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: currentTheme.text.secondary,
        transition: 'background 0.3s ease, color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <Loader2 size={48} className="animate-spin" style={{ color: '#60a5fa' }} />
        <div style={{ fontSize: '18px', fontWeight: '600', color: currentTheme.text.primary }}>Loading dashboard from cloud storage...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.bg.main,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: currentTheme.text.secondary,
      display: 'flex',
      position: 'relative',
      transition: 'background 0.3s ease, color 0.3s ease'
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
        width: isNavbarCollapsed ? '60px' : '320px',
        background: currentTheme.bg.sidebar,
        backdropFilter: 'blur(20px)',
        borderRight: `1px solid ${currentTheme.border.default}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'sticky',
        top: 0,
        transition: 'width 0.3s ease, background 0.3s ease, border-color 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: isNavbarCollapsed ? '24px 12px' : '32px 24px',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative'
        }}>
          {!isNavbarCollapsed && (
            <>
              <div style={{ flex: 1 }}>
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
                <div style={{ fontSize: '14px', color: currentTheme.text.muted, fontWeight: '500' }}>
                  Action Plan Timeline
                </div>
              </div>
            </>
          )}
          <button
            onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
            style={{
              padding: '8px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '6px',
              color: '#60a5fa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              position: isNavbarCollapsed ? 'relative' : 'absolute',
              top: isNavbarCollapsed ? '0' : '32px',
              right: isNavbarCollapsed ? '0' : '12px',
              width: '36px',
              height: '36px'
            }}
            title={isNavbarCollapsed ? 'Expand navbar' : 'Collapse navbar'}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            }}
          >
            {isNavbarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Categories */}
        {!isNavbarCollapsed && (
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
              background: currentTheme.bg.card,
              borderRadius: '8px',
              border: `1px solid ${currentTheme.border.default}`
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
                  background: currentTheme.bg.input,
                  border: `1px solid ${currentTheme.border.default}`,
                  borderRadius: '6px',
                  color: currentTheme.text.secondary,
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
                      ? currentTheme.bg.categoryCardSelected
                      : currentTheme.bg.categoryCard,
                    border: selectedCategory === category
                      ? `1px solid ${currentTheme.border.categorySelected}`
                      : `1px solid ${currentTheme.border.default}`,
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
                      color: currentTheme.text.muted,
                      background: currentTheme.bg.tableHeader,
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      {journeyCount}
                    </div>
                  </div>
                  <div style={{
                    height: '6px',
                    background: currentTheme.bg.progressBar,
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
                  <div style={{ fontSize: '13px', color: currentTheme.text.muted }}>
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
        )}

        {/* Journeys */}
        {!isNavbarCollapsed && (
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
              background: currentTheme.bg.card,
              borderRadius: '8px',
              border: `1px solid ${currentTheme.border.default}`
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
                  background: currentTheme.bg.input,
                  border: `1px solid ${currentTheme.border.default}`,
                  borderRadius: '6px',
                  color: currentTheme.text.secondary,
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
                        background: currentTheme.bg.input,
                        border: `1px solid ${currentTheme.border.accent}`,
                        borderRadius: '6px',
                        color: currentTheme.text.secondary,
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
                        color: selectedJourney === journey.name ? currentTheme.text.primary : currentTheme.text.tertiary,
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
                    <ChevronRight size={18} color={currentTheme.status.inProgress} />
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
            {!showAddJourney && !isNavbarCollapsed && (
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
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              color: currentTheme.text.muted,
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              {selectedCategory}
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '800',
              color: currentTheme.text.primary,
              marginBottom: '12px'
            }}>
              {currentJourney?.name}
            </div>
            {/* Journey Notes */}
            {editMode ? (
              // Edit Mode: Show input if notes exist or if user clicked "Add journey note"
              (currentJourney?.notes || showJourneyNotesInput) ? (
                <input
                  type="text"
                  value={currentJourney?.notes || ''}
                  onChange={(e) => {
                    updateNotes(e.target.value);
                    if (e.target.value.trim()) {
                      setShowJourneyNotesInput(true);
                    }
                  }}
                  onBlur={() => {
                    if (!currentJourney?.notes?.trim()) {
                      setShowJourneyNotesInput(false);
                    }
                  }}
                  placeholder="Add journey notes..."
                  autoFocus={!currentJourney?.notes && showJourneyNotesInput}
                  style={{
                    padding: '10px 16px',
                    background: currentTheme.bg.journeyNote,
                    border: `1px solid ${currentTheme.border.journeyNote}`,
                    borderRadius: '8px',
                    color: currentTheme.text.journeyNote,
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    width: '100%',
                    maxWidth: '500px'
                  }}
                />
              ) : (
                // Edit Mode: Show "Add journey note" button when notes are empty
                <button
                  onClick={() => setShowJourneyNotesInput(true)}
                  style={{
                    padding: '10px 16px',
                    background: currentTheme.bg.journeyNote,
                    border: `1px solid ${currentTheme.border.journeyNote}`,
                    borderRadius: '8px',
                    color: currentTheme.text.journeyNote,
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)';
                    e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(245, 158, 11, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = currentTheme.bg.journeyNote;
                    e.currentTarget.style.borderColor = currentTheme.border.journeyNote;
                  }}
                >
                  <Plus size={14} />
                  Add journey note
                </button>
              )
            ) : (
              // View Mode: Show notes only if they exist
              currentJourney?.notes && (
                <div style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  background: currentTheme.bg.journeyNote,
                  border: `1px solid ${currentTheme.border.journeyNote}`,
                  borderRadius: '8px',
                  color: currentTheme.text.journeyNote,
                  fontSize: '14px'
                }}>
                  📌 {currentJourney.notes}
                </div>
              )
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                padding: '10px',
                background: currentTheme.bg.button,
                border: `1px solid ${currentTheme.border.accent}`,
                borderRadius: '8px',
                color: theme === 'dark' ? '#fbbf24' : '#f59e0b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                width: '44px',
                height: '44px'
              }}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.bg.buttonHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = currentTheme.bg.button;
              }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
            onClick={async () => {
              if (editMode) {
                // Save all changes when clicking Save
                await saveAllChanges();
                setEditMode(false);
                setShowJourneyNotesInput(false); // Reset notes input state
              } else {
                // Enter edit mode
                setEditMode(true);
                // If notes exist, show input; otherwise show button
                setShowJourneyNotesInput(!!currentJourney?.notes);
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
        </div>

        {/* Kanban Board */}
        <div style={{
          background: currentTheme.bg.card,
          border: `1px solid ${currentTheme.border.default}`,
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: currentTheme.text.primary,
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Progress Timeline</span>
            {editMode && (
              <button
                onClick={addStage}
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
                  gap: '8px'
                }}
              >
                <Plus size={16} /> Add Stage
              </button>
            )}
          </div>

          {/* Kanban Columns - Horizontal Layout */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'flex-start', // Prevent columns from stretching to match tallest
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}
          >
            {kanbanColumns.map((column) => {
              const columnStages = getStagesByStatus(column.status);
              const stageCount = columnStages.length;
              const isEmpty = stageCount === 0;

              return (
                <div
                  key={column.status}
                  style={{
                    flex: '0 0 280px',
                    minWidth: '280px',
                    background: column.bgColor,
                    border: `1px solid ${column.borderColor}`,
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    height: isEmpty ? '200px' : '600px', // Fixed height for non-empty, min for empty
                    maxHeight: isEmpty ? '200px' : '600px',
                    minHeight: isEmpty ? '200px' : '0', // No min height for non-empty columns
                    alignSelf: 'flex-start', // Ensure each column has independent height
                    overflow: 'hidden' // Prevent column itself from scrolling
                  }}
                >
                  {/* Column Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    paddingBottom: '12px',
                    borderBottom: `2px solid ${column.borderColor}`,
                    flexShrink: 0
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{ color: column.color, display: 'flex' }}>
                        {getStatusIcon(column.status)}
                      </div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: currentTheme.text.primary
                      }}>
                        {column.label}
                      </span>
                    </div>
                    <div style={{
                      background: column.color,
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: '700',
                      minWidth: '24px',
                      textAlign: 'center'
                    }}>
                      {stageCount}
                    </div>
                  </div>

                  {/* Stage Cards - Scrollable Container */}
                  <div 
                    className="kanban-column-scroll"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      flex: '1 1 0', // Take available space
                      minHeight: isEmpty ? 'auto' : '0',
                      overflowY: isEmpty ? 'visible' : 'auto', // Scroll when content exceeds max height
                      overflowX: 'hidden',
                      paddingRight: isEmpty ? '0' : '4px' // Space for scrollbar
                    }}
                  >
                    {columnStages.length === 0 ? (
                      <div style={{
                        padding: '16px',
                        textAlign: 'center',
                        color: '#94a3b8',
                        fontSize: '13px',
                        fontStyle: 'italic',
                        flexShrink: 0
                      }}>
                        No stages
                      </div>
                    ) : (
                      columnStages.map((stage) => {
                        const stageIndex = stage.originalIndex;
                        const stageDependencies = currentJourney?.dependencies?.filter(
                          dep => dep.item === stage.name
                        ) || [];

                        return (
                          <div
                            key={stage.id || stageIndex}
                            style={{
                              background: currentTheme.bg.stageCard,
                              border: `1px solid ${column.borderColor}`,
                              borderRadius: '10px',
                              padding: '16px',
                              cursor: editMode ? 'default' : 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              if (!editMode) {
                                e.currentTarget.style.borderColor = column.color;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 4px 12px ${column.color}40`;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!editMode) {
                                e.currentTarget.style.borderColor = column.borderColor;
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }
                            }}
                          >
                            {/* Stage Name */}
                            {editMode ? (
                              <input
                                type="text"
                                value={stage.name}
                                onChange={(e) => updateStageLocal(stageIndex, 'name', e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  background: currentTheme.bg.input,
                                  border: `1px solid ${currentTheme.border.default}`,
                                  borderRadius: '6px',
                                  color: currentTheme.text.secondary,
                                  fontSize: '15px',
                                  fontWeight: '600',
                                  fontFamily: 'inherit',
                                  marginBottom: '12px'
                                }}
                              />
                            ) : (
                              <div style={{
                                fontSize: '15px',
                                fontWeight: '700',
                                color: currentTheme.text.primary,
                                marginBottom: '12px',
                                lineHeight: '1.4'
                              }}>
                                {stage.name}
                              </div>
                            )}

                            {/* Status Selector (Edit Mode) */}
                            {editMode && (
                              <select
                                value={stage.status}
                                onChange={(e) => updateStageLocal(stageIndex, 'status', e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  background: currentTheme.bg.input,
                                  border: `1px solid ${currentTheme.border.default}`,
                                  borderRadius: '6px',
                                  color: currentTheme.text.secondary,
                                  fontSize: '13px',
                                  fontFamily: 'inherit',
                                  cursor: 'pointer',
                                  marginBottom: '12px'
                                }}
                              >
                                <option value="not-started">Not Started</option>
                                <option value="active">In Progress</option>
                                <option value="critical">Critical</option>
                                <option value="done">Done</option>
                              </select>
                            )}

                            {/* ETA */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px',
                              fontSize: '12px'
                            }}>
                              <Calendar size={14} style={{ color: currentTheme.text.muted, flexShrink: 0 }} />
                              <span style={{ color: currentTheme.text.muted, marginRight: '4px' }}>ETA:</span>
                              {editMode ? (
                                <input
                                  type="date"
                                  value={stage.eta || ''}
                                  onChange={(e) => updateStageLocal(stageIndex, 'eta', e.target.value || '')}
                                  style={{
                                    flex: 1,
                                    padding: '4px 8px',
                                    background: currentTheme.bg.input,
                                    border: `1px solid ${currentTheme.border.default}`,
                                    borderRadius: '4px',
                                    color: currentTheme.text.secondary,
                                    fontSize: '12px',
                                    fontFamily: 'inherit'
                                  }}
                                />
                              ) : (
                                <span style={{ color: currentTheme.text.tertiary }}>
                                  {stage.eta || 'Not set'}
                                </span>
                              )}
                            </div>

                            {/* Actual */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px',
                              fontSize: '12px'
                            }}>
                              <Calendar size={14} style={{ color: currentTheme.text.muted, flexShrink: 0 }} />
                              <span style={{ color: currentTheme.text.muted, marginRight: '4px' }}>Actual:</span>
                              {editMode ? (
                                <input
                                  type="date"
                                  value={stage.actual || ''}
                                  onChange={(e) => updateStageLocal(stageIndex, 'actual', e.target.value || '')}
                                  style={{
                                    flex: 1,
                                    padding: '4px 8px',
                                    background: currentTheme.bg.input,
                                    border: `1px solid ${currentTheme.border.default}`,
                                    borderRadius: '4px',
                                    color: currentTheme.text.secondary,
                                    fontSize: '12px',
                                    fontFamily: 'inherit'
                                  }}
                                />
                              ) : (
                                <span style={{ color: currentTheme.text.tertiary }}>
                                  {stage.actual || 'Pending'}
                                </span>
                              )}
                            </div>

                            {/* Dependencies */}
                            {stageDependencies.length > 0 && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginBottom: '8px',
                                fontSize: '12px'
                              }}>
                                <Link size={14} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                                <span style={{ color: '#8b5cf6' }}>
                                  {stageDependencies.length} dep{stageDependencies.length > 1 ? 's' : ''}
                                </span>
                              </div>
                            )}

                            {/* Notes Preview */}
                            {stage.notes && (
                              <div style={{
                                marginTop: '8px',
                                padding: '8px',
                                background: currentTheme.bg.notes,
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: currentTheme.text.tertiary,
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap' // Preserve line breaks and wrap text
                              }}>
                                {editMode ? (
                                  <textarea
                                    value={stage.notes}
                                    onChange={(e) => updateStageLocal(stageIndex, 'notes', e.target.value)}
                                    style={{
                                      width: '100%',
                                      minHeight: '60px',
                                      padding: '8px',
                                      background: currentTheme.bg.input,
                                      border: `1px solid ${currentTheme.border.default}`,
                                      borderRadius: '4px',
                                      color: currentTheme.text.secondary,
                                      fontSize: '12px',
                                      fontFamily: 'inherit',
                                      resize: 'vertical'
                                    }}
                                    placeholder="Add notes..."
                                  />
                                ) : (
                                  <span style={{ display: 'block' }}>{stage.notes}</span>
                                )}
                              </div>
                            )}

                            {/* Notes Input (if no notes in edit mode) */}
                            {editMode && !stage.notes && (
                              <textarea
                                value={stage.notes || ''}
                                onChange={(e) => updateStageLocal(stageIndex, 'notes', e.target.value)}
                                placeholder="Add notes..."
                                style={{
                                  width: '100%',
                                  minHeight: '60px',
                                  padding: '8px',
                                  background: currentTheme.bg.input,
                                  border: `1px solid ${currentTheme.border.default}`,
                                  borderRadius: '4px',
                                  color: currentTheme.text.secondary,
                                  fontSize: '12px',
                                  fontFamily: 'inherit',
                                  resize: 'vertical',
                                  marginTop: '8px'
                                }}
                              />
                            )}

                            {/* Delete Button (Edit Mode) */}
                            {editMode && (
                              <button
                                onClick={() => deleteStage(stageIndex)}
                                style={{
                                  marginTop: '8px',
                                  padding: '6px 12px',
                                  background: 'rgba(239, 68, 68, 0.15)',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                  borderRadius: '6px',
                                  color: '#ef4444',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  width: '100%'
                                }}
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dependencies Table */}
        <div style={{
          background: currentTheme.bg.card,
          border: `1px solid ${currentTheme.border.default}`,
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
              color: currentTheme.text.primary,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Link size={20} color={currentTheme.status.inProgress} />
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
                    color: currentTheme.text.muted,
                    textTransform: 'uppercase',
                    background: currentTheme.bg.tableHeader,
                    borderBottom: `1px solid ${currentTheme.border.default}`
                  }}>
                    Item
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: currentTheme.text.muted,
                    textTransform: 'uppercase',
                    background: currentTheme.bg.tableHeader,
                    borderBottom: `1px solid ${currentTheme.border.default}`
                  }}>
                    Depends On
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: currentTheme.text.muted,
                    textTransform: 'uppercase',
                    background: currentTheme.bg.tableHeader,
                    borderBottom: `1px solid ${currentTheme.border.default}`
                  }}>
                    Status
                  </th>
                  {editMode && (
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: currentTheme.text.muted,
                      textTransform: 'uppercase',
                      background: currentTheme.bg.tableHeader,
                      borderBottom: `1px solid ${currentTheme.border.default}`,
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
                    <td style={{ padding: '16px', fontSize: '14px', color: currentTheme.text.secondary }}>
                      {editMode ? (
                        <input
                          type="text"
                          value={dep.item}
                          onChange={(e) => updateDependencyLocal(index, 'item', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            background: currentTheme.bg.input,
                            border: `1px solid ${currentTheme.border.default}`,
                            borderRadius: '6px',
                            color: currentTheme.text.secondary,
                            fontSize: '14px',
                            fontFamily: 'inherit'
                          }}
                        />
                      ) : dep.item}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: currentTheme.text.tertiary }}>
                      {editMode ? (
                        <input
                          type="text"
                          value={dep.dependsOn}
                          onChange={(e) => updateDependencyLocal(index, 'dependsOn', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            background: currentTheme.bg.input,
                            border: `1px solid ${currentTheme.border.default}`,
                            borderRadius: '6px',
                            color: currentTheme.text.secondary,
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
                            background: currentTheme.bg.input,
                            border: `1px solid ${currentTheme.border.default}`,
                            borderRadius: '6px',
                            color: currentTheme.text.secondary,
                            fontSize: '13px',
                            fontFamily: 'inherit',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="completed">Completed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="critical">Critical</option>
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
                          onClick={() => deleteDependencyLocal(index)}
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
          background: currentTheme.bg.card,
          border: `1px solid ${currentTheme.border.default}`,
          borderRadius: '16px',
          padding: '32px'
        }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: currentTheme.text.primary, marginBottom: '16px' }}>
            Overall Progress
          </div>
          <div style={{
            height: '12px',
            background: currentTheme.bg.progressBar,
            borderRadius: '6px',
            overflow: 'hidden',
            border: `1px solid ${currentTheme.border.default}`
          }}>
            <div style={{
              height: '100%',
              width: overallProgress + '%',
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
              borderRadius: '6px'
            }} />
          </div>
          <div style={{ marginTop: '12px', fontSize: '14px', color: currentTheme.text.muted }}>
            {(currentJourney?.stages?.filter(s => s.status === 'done').length || 0)} of {(currentJourney?.stages?.length || 0)} stages completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default DubaiAIDashboard;

