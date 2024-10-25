class EmployeeManager {

    private val employees: MutableList<Employee> = mutableListOf()

    data class Employee(
        val id: Int,
        val name: String,
        val salary: Double,
        val department: String
    )

    fun addEmployee(employee: Employee): Boolean {
        return employees.add(employee)
    }

    fun countEmployees() = employees.size

    fun countEmployeesByDepartment(department: String): Int {
        val count: Int = employees.count { it.department == department }

        println("Number of employees in $department: $count")
        return count
    }

    fun calculateTotalSalary(): Double {
        return employees.sumOf { it.salary }
    }

    fun increaseSalaryByDepartment(department: String, percentage: Double) {
        if (percentage <= 0) {
            println("Percentage increase should be greater than 0")
            return
        }

        employees.filter { it.department == department }
            .forEach { employee ->
                val newSalary = employee.salary * (1 + percentage / 100)
                val updatedEmployee = employee.copy(salary = newSalary)

                employees[employees.indexOf(employee)] = updatedEmployee
            }

        println("Salaries for department $department increased by $percentage%")
    }

    fun getEmployeesByDepartment(department: String): List<Employee> {
        return when (department) {
            "HR" -> employees.filter { it.department == "HR" }
            "IT" -> employees.filter { it.department == "IT" }
            "Finance" -> employees.filter { it.department == "Finance" }
            else -> emptyList()
        }
    }

    private fun findEmployeeById(id: Int): Employee? {
        return employees.find { it.id == id }
    }

    fun printEmployeeById(id: Int) {
        findEmployeeById(id)?.let {
            println("Employee found: $it")
        } ?: println("Employee with ID $id not found")
    }
}


