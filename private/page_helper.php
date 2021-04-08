<?php
class page_helper
{
    public static function temp1(stdClass $data): void
    {
        ob_start();
?>
        <!DOCTYPE html>
        <html lang="tr">

        <head>
            <title>SUBUTAI</title>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
            <?php echo $data->head; ?>
        </head>

        <body>
            <div id="app"></div>
            <?php echo $data->body; ?>
        </body>

        </html>
    <?php
        ob_end_flush();
    }

    public static function error(Exception $ex)
    {
        ob_start();
    ?>
        <!DOCTYPE html>
        <html>

        <head profile="http://www.w3.org/2005/10/profile">
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>SUBUTAI</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
        </head>

        <body>
            <h2>Error</h2>
            <ul style="color: red;">
                <li><b>Message:</b><?php echo $ex->getMessage(); ?></li>
                <li><b>File:</b><?php echo $ex->getFile(); ?></li>
                <li><b>Line:</b><?php echo $ex->getLine(); ?></li>
            </ul>
        </body>
<?php
        ob_end_flush();
    }
}