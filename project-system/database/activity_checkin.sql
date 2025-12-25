-- ----------------------------
-- 活动签到表创建SQL
-- ----------------------------
DROP TABLE IF EXISTS `activity_checkin`;
CREATE TABLE `activity_checkin`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `activity_id` bigint NOT NULL COMMENT '活动ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `checkin_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '签到时间',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_activity_user`(`activity_id` ASC, `user_id` ASC) USING BTREE COMMENT '活动和用户唯一索引（防止重复签到）',
  INDEX `idx_activity_id`(`activity_id` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_checkin_time`(`checkin_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '活动签到表' ROW_FORMAT = DYNAMIC;

