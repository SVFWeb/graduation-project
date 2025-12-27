-- ----------------------------
-- 为活动报名表添加文字评价字段
-- ----------------------------
ALTER TABLE `activity_registration` 
ADD COLUMN `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文字评价' AFTER `score`;

