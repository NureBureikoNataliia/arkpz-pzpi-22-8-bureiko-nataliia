package com.example.firstapp.navigation

import com.example.firstapp.R

const val MENU_ROUTE = "root"

interface Destinations {
    val route: String
    val title: String
    val icon: Int
}

object Home : Destinations {
    override val route = "Home"
    override val title = "Home"
    override val icon = R.drawable.home
}

object AboutUs : Destinations {
    override val route = "About Us"
    override val title = "About Us"
    override val icon = R.drawable.info
}

object Location : Destinations {
    override val route = "Location"
    override val title = "Our Location"
    override val icon = R.drawable.location
}

object Cart : Destinations {
    override val route = "Cart"
    override val title = "Cart"
    override val icon = R.drawable.shopping_cart
}

object Product : Destinations {
    override val route = "Product"
    override val title = "Product"
    override val icon = R.drawable.info
}

object Search : Destinations {
    override val route = "Search"
    override val title = "Search"
    override val icon = R.drawable.info
}