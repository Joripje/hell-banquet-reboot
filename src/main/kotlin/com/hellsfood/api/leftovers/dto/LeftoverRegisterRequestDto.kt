package com.hellsfood.api.leftovers.dto


class LeftoverRegisterRequestDto {
    lateinit var userId: String
    var amount: Int = -1
    var courseNo: Int = -1
}