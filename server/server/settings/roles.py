from rolepermissions.roles import AbstractUserRole

class Admin(AbstractUserRole):
    available_permissions = {
        'get_units': True,
        'create_units': True,
        'view_units': True,
        'update_units': True,
        'delete_units': True,
        'get_unit_records': True,
        'get_managers': True,
        'create_managers': True,
        'view_managers': True,
        'update_managers': True,
        'delete_managers': True,
        'get_technicians': True,
        'create_technicians': True,
        'view_technicians': True,
        'update_technicians': True,
        'delete_technicians': True,
        'get_buildings': True,
        'create_buildings': True,
        'view_buildings': True,
        'update_buildings': True,
        'delete_buildings': True,
        'get_companies': True,
        'create_companies': True,
        'view_companies': True,
        'update_companies': True,
        'delete_companies': True,
        'get_tasks': True,
        'create_tasks': True,
        'view_tasks': True,
        'update_tasks': True,
        'delete_tasks': True,
        'get_profiles': True,
        'create_profiles': True,
        'view_profiles': True,
        'update_profiles': True,
        'delete_profiles': True,
        'get_plans': True,
        'create_plans': True,
        'view_plans': True,
        'update_plans': True,
        'delete_plans': True,
        'get_visits': True,
        'create_visits': True,
        'view_visits': True,
        'update_visits': True,
        'delete_visits': True,
        'get_completions': True,
        'create_completions': True,
        'view_completions': True,
        'update_completions': True,
        'delete_completions': True,
    }

class Technician(AbstractUserRole):
    available_permissions = {
        'view_units': True,
        'get_unit_records': True,
        'view_tasks': True,
        'view_profiles': True,
        'view_plans': True,
        'create_visits': True,
        'create_completions': True,
    }

class Company(AbstractUserRole):
    available_permissions = {
        'get_units': True,
        'create_units': True,
        'view_units': True,
        'update_units': True,
        'get_unit_records': True,
        'get_managers': True,
        'create_managers': True,
        'view_managers': True,
        'update_managers': True,
        'get_technicians': True,
        'create_technicians': True,
        'view_technicians': True,
        'update_technicians': True,
        'get_buildings': True,
        'create_buildings': True,
        'view_buildings': True,
        'update_buildings': True,
        'get_tasks': True,
        'create_tasks': True,
        'view_tasks': True,
        'update_tasks': True,
        'get_profiles': True,
        'create_profiles': True,
        'view_profiles': True,
        'update_profiles': True,
        'get_plans': True,
        'create_plans': True,
        'view_plans': True,
        'update_plans': True,
        'get_visits': True,
        'view_visits': True,
        'get_completions': True,
        'view_completions': True,
        'get_company_users': True,
        'create_company_users': True,
        'view_company_users': True,
        'update_company_users': True,
        'delete_company_users': True,
    }

class Manager(AbstractUserRole):
    available_permissions = {
        'get_units': True,
        'view_units': True,
        'get_unit_records': True,
        'get_buildings': True,
        'view_buildings': True,
        'get_profiles': True,
        'view_profiles': True,
    }

class Inspector(AbstractUserRole):
    available_permissions = {
        
    }

class User(AbstractUserRole):
    available_permissions = {

    }