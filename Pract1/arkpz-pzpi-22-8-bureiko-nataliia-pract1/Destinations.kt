package com.example.firstapp.navigation

import com.example.firstapp.R

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
