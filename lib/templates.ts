import { Template } from "@/types/app";

export const templates: Template[] = [
  {
    id: "crm",
    name: "CRM Workspace",
    description: "Manage clients, contacts, deals, revenue, and follow-ups",
    category: "Sales",
    complexity: "Advanced",
    tags: ["crm", "sales", "customer", "client", "contact", "deal", "pipeline"],
    schema: {
      pages: [
        {
          id: "crm-dashboard",
          name: "CRM Dashboard",
          components: [
            {
              id: "crm-kpis",
              type: "metrics",
              title: "CRM Performance",
              fields: [
                { id: "total-clients", name: "Total Clients", type: "metric" },
                { id: "active-deals", name: "Active Deals", type: "metric" },
                { id: "monthly-revenue", name: "Monthly Revenue", type: "currency" },
                { id: "conversion-rate", name: "Conversion Rate", type: "percentage" },
              ],
            },
            {
              id: "clients-table",
              type: "table",
              title: "Clients",
              fields: [
                { id: "name", name: "Name", type: "text" },
                { id: "email", name: "Email", type: "email" },
                { id: "company", name: "Company", type: "text" },
                { id: "status", name: "Status", type: "select" },
                { id: "deal-value", name: "Deal Value", type: "currency" },
              ],
            },
            {
              id: "sales-pipeline",
              type: "kanban",
              title: "Sales Pipeline",
              fields: [
                { id: "lead", name: "Lead", type: "stage" },
                { id: "qualified", name: "Qualified", type: "stage" },
                { id: "proposal", name: "Proposal", type: "stage" },
                { id: "closed", name: "Closed", type: "stage" },
              ],
            },
            {
              id: "recent-activity",
              type: "activity",
              title: "Recent Follow-ups",
              fields: [
                { id: "call", name: "Client Call", type: "activity" },
                { id: "email-sent", name: "Email Sent", type: "activity" },
                { id: "meeting", name: "Meeting Scheduled", type: "activity" },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: "inventory",
    name: "Inventory System",
    description: "Track stock, suppliers, warehouse movement, and reorder alerts",
    category: "Operations",
    complexity: "Advanced",
    tags: ["inventory", "stock", "warehouse", "products", "supplier", "reorder"],
    schema: {
      pages: [
        {
          id: "inventory-dashboard",
          name: "Inventory Dashboard",
          components: [
            {
              id: "inventory-kpis",
              type: "metrics",
              title: "Inventory Overview",
              fields: [
                { id: "total-products", name: "Total Products", type: "metric" },
                { id: "low-stock", name: "Low Stock Items", type: "metric" },
                { id: "warehouse-value", name: "Warehouse Value", type: "currency" },
                { id: "pending-orders", name: "Pending Orders", type: "metric" },
              ],
            },
            {
              id: "inventory-table",
              type: "table",
              title: "Products",
              fields: [
                { id: "product", name: "Product", type: "text" },
                { id: "sku", name: "SKU", type: "text" },
                { id: "quantity", name: "Quantity", type: "number" },
                { id: "supplier", name: "Supplier", type: "text" },
                { id: "status", name: "Stock Status", type: "select" },
              ],
            },
            {
              id: "stock-movement",
              type: "activity",
              title: "Stock Movement",
              fields: [
                { id: "received", name: "Stock Received", type: "activity" },
                { id: "transferred", name: "Warehouse Transfer", type: "activity" },
                { id: "dispatched", name: "Order Dispatched", type: "activity" },
              ],
            },
            {
              id: "reorder-alerts",
              type: "alerts",
              title: "Reorder Alerts",
              fields: [
                { id: "critical-stock", name: "Critical Stock", type: "alert" },
                { id: "delayed-supply", name: "Delayed Supply", type: "alert" },
                { id: "supplier-risk", name: "Supplier Risk", type: "alert" },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: "analytics",
    name: "Analytics Workspace",
    description: "Monitor reports, KPIs, charts, trends, and business insights",
    category: "Analytics",
    complexity: "Advanced",
    tags: ["analytics", "report", "chart", "dashboard", "insight", "kpi"],
    schema: {
      pages: [
        {
          id: "analytics-dashboard",
          name: "Analytics Dashboard",
          components: [
            {
              id: "analytics-kpis",
              type: "metrics",
              title: "Business Metrics",
              fields: [
                { id: "total-users", name: "Total Users", type: "metric" },
                { id: "growth-rate", name: "Growth Rate", type: "percentage" },
                { id: "revenue", name: "Revenue", type: "currency" },
                { id: "retention", name: "Retention", type: "percentage" },
              ],
            },
            {
              id: "performance-chart",
              type: "chart",
              title: "Performance Trend",
              fields: [
                { id: "monthly-growth", name: "Monthly Growth", type: "line-chart" },
                { id: "revenue-trend", name: "Revenue Trend", type: "bar-chart" },
              ],
            },
            {
              id: "reports-table",
              type: "table",
              title: "Reports",
              fields: [
                { id: "report-name", name: "Report Name", type: "text" },
                { id: "owner", name: "Owner", type: "text" },
                { id: "status", name: "Status", type: "select" },
                { id: "last-updated", name: "Last Updated", type: "date" },
              ],
            },
            {
              id: "insight-feed",
              type: "activity",
              title: "Insight Feed",
              fields: [
                { id: "growth-spike", name: "Growth Spike Detected", type: "activity" },
                { id: "revenue-drop", name: "Revenue Drop Flagged", type: "activity" },
                { id: "retention-alert", name: "Retention Alert Created", type: "activity" },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: "hr",
    name: "HR Dashboard",
    description: "Manage employees, leave requests, hiring pipeline, and attendance",
    category: "People",
    complexity: "Advanced",
    tags: ["hr", "employee", "leave", "attendance", "hiring", "recruitment"],
    schema: {
      pages: [
        {
          id: "hr-dashboard",
          name: "HR Dashboard",
          components: [
            {
              id: "hr-kpis",
              type: "metrics",
              title: "Workforce Overview",
              fields: [
                { id: "employees", name: "Employees", type: "metric" },
                { id: "open-roles", name: "Open Roles", type: "metric" },
                { id: "leave-requests", name: "Leave Requests", type: "metric" },
                { id: "attendance-rate", name: "Attendance Rate", type: "percentage" },
              ],
            },
            {
              id: "employees-table",
              type: "table",
              title: "Employees",
              fields: [
                { id: "name", name: "Name", type: "text" },
                { id: "department", name: "Department", type: "text" },
                { id: "role", name: "Role", type: "text" },
                { id: "status", name: "Status", type: "select" },
                { id: "joining-date", name: "Joining Date", type: "date" },
              ],
            },
            {
              id: "hiring-pipeline",
              type: "kanban",
              title: "Hiring Pipeline",
              fields: [
                { id: "screening", name: "Screening", type: "stage" },
                { id: "interview", name: "Interview", type: "stage" },
                { id: "offer", name: "Offer", type: "stage" },
                { id: "hired", name: "Hired", type: "stage" },
              ],
            },
            {
              id: "leave-activity",
              type: "activity",
              title: "Leave Requests",
              fields: [
                { id: "leave-requested", name: "Leave Requested", type: "activity" },
                { id: "leave-approved", name: "Leave Approved", type: "activity" },
                { id: "policy-update", name: "Policy Updated", type: "activity" },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: "admin",
    name: "Admin Dashboard",
    description: "Manage users, roles, permissions, logs, and system settings",
    category: "Admin",
    complexity: "Advanced",
    tags: ["admin", "users", "roles", "permissions", "settings", "logs"],
    schema: {
      pages: [
        {
          id: "admin-dashboard",
          name: "Admin Dashboard",
          components: [
            {
              id: "admin-kpis",
              type: "metrics",
              title: "System Overview",
              fields: [
                { id: "active-users", name: "Active Users", type: "metric" },
                { id: "roles", name: "Roles", type: "metric" },
                { id: "permissions", name: "Permissions", type: "metric" },
                { id: "system-alerts", name: "System Alerts", type: "metric" },
              ],
            },
            {
              id: "users-table",
              type: "table",
              title: "Users",
              fields: [
                { id: "name", name: "Name", type: "text" },
                { id: "email", name: "Email", type: "email" },
                { id: "role", name: "Role", type: "select" },
                { id: "last-login", name: "Last Login", type: "date" },
              ],
            },
            {
              id: "permissions-table",
              type: "table",
              title: "Permission Matrix",
              fields: [
                { id: "module", name: "Module", type: "text" },
                { id: "admin-access", name: "Admin Access", type: "select" },
                { id: "editor-access", name: "Editor Access", type: "select" },
                { id: "viewer-access", name: "Viewer Access", type: "select" },
              ],
            },
            {
              id: "security-alerts",
              type: "alerts",
              title: "Security Alerts",
              fields: [
                { id: "failed-login", name: "Failed Login Spike", type: "alert" },
                { id: "role-change", name: "Role Change Detected", type: "alert" },
                { id: "api-threshold", name: "API Threshold Warning", type: "alert" },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: "support",
    name: "Support Workspace",
    description: "Track tickets, customer issues, SLA status, and agent workloads",
    category: "Support",
    complexity: "Advanced",
    tags: ["support", "ticket", "customer issue", "sla", "agent", "helpdesk"],
    schema: {
      pages: [
        {
          id: "support-dashboard",
          name: "Support Dashboard",
          components: [
            {
              id: "support-kpis",
              type: "metrics",
              title: "Support Overview",
              fields: [
                { id: "open-tickets", name: "Open Tickets", type: "metric" },
                { id: "avg-response", name: "Avg Response Time", type: "metric" },
                { id: "sla-breaches", name: "SLA Breaches", type: "metric" },
                { id: "resolved-today", name: "Resolved Today", type: "metric" },
              ],
            },
            {
              id: "tickets-table",
              type: "table",
              title: "Tickets",
              fields: [
                { id: "ticket-id", name: "Ticket ID", type: "text" },
                { id: "customer", name: "Customer", type: "text" },
                { id: "priority", name: "Priority", type: "select" },
                { id: "status", name: "Status", type: "select" },
                { id: "owner", name: "Owner", type: "text" },
              ],
            },
            {
              id: "ticket-pipeline",
              type: "kanban",
              title: "Ticket Pipeline",
              fields: [
                { id: "new", name: "New", type: "stage" },
                { id: "triage", name: "Triage", type: "stage" },
                { id: "in-progress", name: "In Progress", type: "stage" },
                { id: "resolved", name: "Resolved", type: "stage" },
              ],
            },
            {
              id: "sla-alerts",
              type: "alerts",
              title: "SLA Alerts",
              fields: [
                { id: "urgent-ticket", name: "Urgent Ticket Aging", type: "alert" },
                { id: "sla-risk", name: "SLA Risk Detected", type: "alert" },
                { id: "agent-overload", name: "Agent Workload High", type: "alert" },
              ],
            },
          ],
        },
      ],
    },
  },
];