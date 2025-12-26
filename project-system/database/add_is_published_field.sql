-- ----------------------------
-- 为活动表添加上下架字段
-- ----------------------------
ALTER TABLE `activity` 
ADD COLUMN `is_published` tinyint(1) NULL DEFAULT 1 COMMENT '是否上架(0-下架,1-上架)' AFTER `score`;

-- 将现有已通过审核的活动设置为上架状态
UPDATE `activity` SET `is_published` = 1 WHERE `audit_status` = 1;

-- 将待审核和已拒绝的活动设置为下架状态
UPDATE `activity` SET `is_published` = 0 WHERE `audit_status` != 1 OR `audit_status` IS NULL;

