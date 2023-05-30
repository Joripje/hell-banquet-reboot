package com.hellsfood.api.leftovers.dto


class LeftoverRegisterRequestDto {
    lateinit var userId: String
    var before: Int = -1
    var after: Int = -1
    var courseNo: Int = -1
}